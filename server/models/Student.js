var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new mongoose.Schema({
  name: String,
  cohort: String,
  first_stack:  {
                  stack: String,
                  month: String,
                  belt:  String
                },
  second_stack: {
                  stack: String,
                  month: String,
                  belt:  String,
                },
  third_stack:  {
                  stack: String,
                  month: String,
                  belt:  String
                },
  black_belt: String,
  img: String,
  needs_info: Boolean
})


var Student = mongoose.model('Student', StudentSchema);
