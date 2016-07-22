angular.module('materialApp',['ngMaterial', 'ngRoute'])
	.config(['$routeProvider',
	  	function($routeProvider) {
	    	$routeProvider.
	      	when('/', {
	        	templateUrl: 'templates/mainPage.html',
	        	controller: 'MainController'
	      	}).
	      	otherwise({
	        	redirectTo: '/'
	    	});
	  	}
  	])
  	.controller('MainController', function($scope, $http) {
  		//movies
  		$http({
			method: 'GET',
			url: 'http://api.themoviedb.org/3/movie/now_playing?api_key=dcb9184c0fa834e428249a41f467c635&page=1'
		}).then(function successCallback(response) {
		    $scope.movies = response.data.results;
		  }, function errorCallback(response) {
		    console.log('no movies');
		});
		//Tv shows
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
		});
  	})
	.controller('AppCtrl', function($scope) {
		
	})
	.controller('SideNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	});