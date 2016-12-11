app.controller('MainController', ['$scope', '$http', '$rootScope', 'coordinates', function($scope, $http, $rootScope, coordinates) {

	if ($rootScope.click_lat && $rootScope.click_lng) {
		$scope.mapCenter = {
			lat: $rootScope.click_lat,
			lng: $rootScope.click_lng,
			zoom: 14
		}
	} else {
		$scope.mapCenter = {
			lat: coordinates.lat,
			lng: coordinates.lng,
			zoom: 14
		}
	}

	var getSightsPointsFromWikipedia = $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=' + coordinates.lat + '%7C' + coordinates.lng + '&gslimit=30&format=json&callback=JSON_CALLBACK')
		.success(function(data) {
			return data
		})

	var getSightsPointsFromOwnAPI = $http.get('/geodata')
		.success(function(data) {
			return data
		})

	$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coordinates.lat + '%2C' + coordinates.lng + '&language=en')
		.success(function(data) {
			$scope.city = data.results[0].address_components[2].long_name
			$scope.address = data.results[0].formatted_address
		})

	getSightsPointsFromOwnAPI.success(function(data) {
		$scope.geodata_mongo = data.geodata.map(function(point) {
			return point
		})
		$scope.mapMarkers = geodataToMarkers($scope.geodata_mongo)
	})

	getSightsPointsFromWikipedia.success(function(data) {
		$scope.geodata_wiki = data.query.geosearch.map(function(point) {
			return point
		})
		var currentPositionPoint = {
			lat: coordinates.lat,
			lng: coordinates.lng,
			message: 'Your approximate location in ' + $scope.city + ' is lat: ' + coordinates.lat + ' and lon: ' + coordinates.lng + ' (' + $scope.address + ')' + '. You can also see some of the sights within a radius of 10 kilometers.',
			icon: {
				type: 'awesomeMarker',
				icon: 'user',
				markerColor: 'blue',
				iconColor: 'white'
			}
		}
		$scope.mapMarkers = $scope.mapMarkers.concat(geodataToMarkers($scope.geodata_wiki))
		$scope.mapMarkers.push(currentPositionPoint)
	})

	$scope.$on('leafletDirectiveMap.click', function(event, wrap) {
		$rootScope.click_lat = wrap.leafletEvent.latlng.lat
		$rootScope.click_lng = wrap.leafletEvent.latlng.lng
		var currentPositionPoint = {
			lat: wrap.leafletEvent.latlng.lat,
			lng: wrap.leafletEvent.latlng.lng,
			message: 'Select location lat: ' + wrap.leafletEvent.latlng.lat + ' and lon: ' + wrap.leafletEvent.latlng.lng,
			icon: {
				type: 'awesomeMarker',
				icon: 'user',
				markerColor: 'blue',
				iconColor: 'white'
			}
		}
		$scope.mapMarkers.splice(-1, 1)
		$scope.mapMarkers.push(currentPositionPoint)
	})

}])
