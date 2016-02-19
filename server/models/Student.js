var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new mongoose.Schema({
  name: String,
  cohort: String,
  first_stack:  {
                  month: String,
                  stack: String,
                  belt:  String
                },
  second_stack: {
                  month: String,
                  stack: String,
                  belt:  String,
                },
  third_stack:  {
                  month: String,
                  stack: String,
                  belt:  String
                },
  black_belt: String,
  img: String,
  needs_info: Boolean
})


var Student = mongoose.model('Student', StudentSchema);
