angular.module('materialApp',['ngMaterial', 'ngRoute', 'ngMdIcons'])
	.config(['$routeProvider', '$locationProvider',
	  	function($routeProvider, $locationProvider) {
	    	$routeProvider.
	      	when('/', {
	        	templateUrl: 'templates/mainPage.html',
	        	controller: 'MainController'
	      	}).
	      	otherwise({
	        	redirectTo: '/'
	    	});

	    	$locationProvider.html5Mode(true);
	  	}
  	])
  	.controller('MainController', function($scope, $http) {
  		//movies
  		$http({
			method: 'GET',
			url: 'http://api.themoviedb.org/3/movie/now_playing?api_key=dcb9184c0fa834e428249a41f467c635&page=1'
		}).then(function successCallback(response) {
		    $scope.shows = response.data.results;
		  }, function errorCallback(response) {
		    console.log('no movies');
		});
		/*//Tv shows
		$http({
			method: 'GET',
			url: 'http://api.themoviedb.org/3/tv/airing_today?api_key=dcb9184c0fa834e428249a41f467c635&page=1'
		}).then(function successCallback(response) {
		    $scope.tvShows = response.data.results;
		  }, function errorCallback(response) {
		    console.log('no tv shows');
		});
		//Persons
		$http({
			method: 'GET',
			url: 'http://api.themoviedb.org/3/person/popular?api_key=dcb9184c0fa834e428249a41f467c635&page=1'
		}).then(function successCallback(response) {
		    $scope.persons = response.data.results;
		  }, function errorCallback(response) {
		    console.log('no persons');
		});*/

		$scope.$on('show:select', function(event, data) {
			$scope.select = data.select;
			$scope.showBy = data.showBy;
			if($scope.select=="person" && $scope.showBy=="top_rated"){
				$scope.showBy = "latest";
			}
			$http({
				method: 'GET',
				url: 'http://api.themoviedb.org/3/'+$scope.select+'/'+$scope.showBy+'?api_key=dcb9184c0fa834e428249a41f467c635&page=1'
			}).then(function successCallback(response) {
			    $scope.shows = response.data.results;
			  }, function errorCallback(response) {
			    console.log('no tv shows');
			});
		});
  	})
	.controller('AppCtrl', function($scope) {
		
	})
	.controller('SideNavCtrl', function ($scope) {
		$scope.movie = "buttonColorOnSelect";
		$scope.tvShow = "";
		$scope.person = "";
		$scope.popular = "buttonColorOnSelect";
		$scope.topRated = "";
		$scope.select = "movie";
		$scope.showBy = "popular";
		$scope.btnSelected = function($event) {
			$scope.select = $event.currentTarget.value;
			$scope.movie = "";
			$scope.tvShow = "";
			$scope.person = "";
			if($scope.select==="movie"){
				$scope.movie = "buttonColorOnSelect";
			}else if($scope.select==="tv"){
				$scope.tvShow = "buttonColorOnSelect";
			}else if($scope.select==="person"){
				if($scope.showBy==="top_rated"){
					$scope.topRated = "";
					$scope.popular = "buttonColorOnSelect";
					$scope.showBy = "popular";
				}
				$scope.person = "buttonColorOnSelect";
			}
			$scope.data = {'select': $scope.select, 'showBy': $scope.showBy};
			$scope.$broadcast('show:select',$scope.data);
		}
		$scope.categorySelected = function($event) {
			$scope.showBy = $event.currentTarget.value;
			$scope.popular = "";
			$scope.topRated = "";
			if($scope.showBy==="popular"){
				$scope.popular = "buttonColorOnSelect";
			}else if($scope.showBy==="top_rated"){
				$scope.topRated = "buttonColorOnSelect";
			}
			$scope.data = {'select': $scope.select, 'showBy': $scope.showBy};
			$scope.$broadcast('show:select',$scope.data);
		}
	});