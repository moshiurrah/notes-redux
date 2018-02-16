'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var path = process.cwd();
var Notes = new Schema({
	content: { type: String, maxlength:[1000,'Note too long!']},
	color: { type: String, default: '#FFEE58' }
});


module.exports = mongoose.model('Notes', Notes);
