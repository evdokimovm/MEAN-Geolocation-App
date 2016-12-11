var express = require('express')
var router = express.Router()
var cors = require('cors')

var GeoData = require('../models/geodata')

router.get('/', function(req, res) {
	res.sendFile('index.html')
})

router.get('/geodata', cors(), function(req, res, next) {
	var query = GeoData.find({})

	query.exec(function(err, data) {
		if (err) res.send(err)

		res.json({
			geodata: data.map(function(data) {
				return {
					title: data.title,
					lat: data.lat,
					lon: data.lon,
					link: data.link
				}
			})
		})
	})
})

router.post('/geodata', function(req, res, next) {
	var newGeodata = new GeoData(req.body)

	newGeodata.save(function(err) {
		if (err) res.send(err)

		res.json(req.body)
	})
})

module.exports = router
