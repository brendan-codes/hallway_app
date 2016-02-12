var mongoose = require('mongoose');
var Cohort = mongoose.model('Cohort');

module.exports = (function(){
  return {
    index: function(req, res){
      Cohort.find({}, function (err, cohorts){
        if(err){
          console.log('messed');
        }else{
          res.render('cohorts', {cohorts: cohorts});
        }
      })
    },
    new_cohort: function(req, res){
      var new_cohort = new Cohort(req.body);
      new_cohort.save(function(err){
        if(err){
          console.log('still messed');
        }else{
          res.redirect('/cohorts');
        }
      })
    }
  }
})();
