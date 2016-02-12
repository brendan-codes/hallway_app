var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new mongoose.Schema({
  name: String,
  cohort: String,
  black_belt: String,
  img: String,
  needs_info: Boolean
})


var Student = mongoose.model('Student', StudentSchema);
