// This file seeds the database with some nessesary documents,
// including the 'staff' and 'residents' cohorts, as well as a
// document to save the main announcement blast.


var mongoose = require('mongoose');
var Blast = mongoose.model('Blast');
var Cohort = mongoose.model('Cohort');


Blast.findOne({}, function (err, blast){
  if(!blast){
    var new_blast = new Blast();
    console.log(blast);
    new_blast.save(function(err){
      cconsole.log('Initialized main blast!')
    })
  }else{
    console.log('Main blast exists!')
  }
})

Cohort.findOne({date: 'Staff'}, function(err, staff_cohort){
  if(staff_cohort == null){
    var new_staff = new Cohort();
    new_staff.date = 'Staff';
    new_staff.save(function(err){
      console.log('Initialized staff!')
    })
  }else{
    console.log('Staff cohort exists!')
  }
})

Cohort.findOne({date: 'Residents'}, function(err, residents){
  if(residents == null){
    var new_residency = new Cohort();
    new_residency.date = 'Residents';
    new_residency.save(function(err){
      console.log('Initialized residents!')
    })
  }else{
    console.log('Residents cohort exists!')
  }
})
