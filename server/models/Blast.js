var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlastSchema = new mongoose.Schema({
  text: String,
})

var Blast = mongoose.model('Blast', BlastSchema);
