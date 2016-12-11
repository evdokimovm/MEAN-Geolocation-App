var app = angular.module('geoApp', ['ngRoute', 'leaflet-directive'])

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'views/main.html',
			resolve: {
				coordinates: function(myCoordinates) {
					return myCoordinates
				}
			}
		})
		.when('/geo', {
			controller: 'AddGeoPointController',
			templateUrl: 'views/form.html',
			resolve: {
				coordinates: function(myCoordinates) {
					return myCoordinates
				}
			}
		})
		.when('/about', {
			controller: 'AboutController',
			templateUrl: 'views/about.html'
		})
		.otherwise({
			redirectTo: '/'
		})

})
