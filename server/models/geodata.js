var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GeoDataSchema = new Schema({
	title: String,
	lat: Number,
	lon: Number,
	link: {
		type: String,
		default: ''
	}
}, {
	collection: 'geodata'
})

module.exports = mongoose.model('GeoData', GeoDataSchema)
