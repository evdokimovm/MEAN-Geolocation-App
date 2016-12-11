app.factory('myCoordinates', ['$q', function myCoordinates($q) {

	var deferred = $q.defer()

	if (window.navigator && window.navigator.geolocation) {
		window.navigator.geolocation.getCurrentPosition(getCoordinates)
	} else {
		deferred.reject({ msg: "Browser does not supports HTML5 geolocation" })
	}

	function getCoordinates(coordinates) {
		var myCoordinates = {};
		myCoordinates.lat = coordinates.coords.latitude
		myCoordinates.lng = coordinates.coords.longitude
		deferred.resolve(myCoordinates)
	}

	return deferred.promise

}])
