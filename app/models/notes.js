'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var path = process.cwd();
var Notes = new Schema({
	content: { type: String, maxlength:[1000,'Note too long!']},
});


module.exports = mongoose.model('Notes', Notes);
