var geodataToMarkers = function(geodata) {
	var markers = []
	geodata.map(function(point, i) {
		place = {
			lat: point.lat,
			lng: point.lon,
			message: getMessage(point.title, point.link)
		}
		markers.push(place)
	})
	return markers
}

var getMessage = function(title, link) {
	if (link) {
		return "<a target='_blank' href='" + link + "'>" + title + "</a>"
	} else {
		var url = "http://en.wikipedia.org/wiki/" + title
		return "<a target='_blank' href='" + url + "'>" + title + "</a>";
	}
}
