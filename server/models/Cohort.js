var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CohortSchema = new mongoose.Schema({
  date: String,
  _students: [{type: Schema.Types.ObjectId, ref: 'Student'}]
})

var Cohort = mongoose.model('Cohort', CohortSchema);
