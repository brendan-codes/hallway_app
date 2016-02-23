// This is literally a single document collection to hold the
// main announcement blasts.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlastSchema = new mongoose.Schema({
  text: String,
})

var Blast = mongoose.model('Blast', BlastSchema);
