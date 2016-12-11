app.controller('AddGeoPointController', ['$scope', '$rootScope', '$http', 'coordinates', function($scope, $rootScope, $http, coordinates) {
	$scope.formData = {}

	$scope.formData.latitude = $rootScope.click_lat
	$scope.formData.longitude = $rootScope.click_lng

	$scope.createGeoData = function() {
		var geoData = {
			title: $scope.formData.title,
			lat: $scope.formData.latitude,
			lon: $scope.formData.longitude,
			link: $scope.formData.link
		}
		$http.post('/geodata', geoData)
			.success(function(data) {
				$scope.formData.title = ""
				$scope.formData.lat = ""
				$scope.formData.lon = ""
				$scope.formData.link = ""
			})
			.error(function(data) {
				console.log('Error: ' + data)
			})
	}

	$scope.useYourLocation = function() {
		$scope.formData.latitude = coordinates.lat
		$scope.formData.longitude = coordinates.lng
	}

}])
