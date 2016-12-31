var express = require('express')
var app = express()

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/geolocation')

app.use(express.static(__dirname + '/../public'))

var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

var api = require('./api/index')
app.use(api)

var port = process.env.PORT || 8080
app.listen(port, function() {
	console.log('Node.js listening on port ' + port)
})
