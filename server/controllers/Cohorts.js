var mongoose = require('mongoose');
var Cohort = mongoose.model('Cohort');

module.exports = (function(){
  return {
    index: function(req, res){
      Cohort.find({}, function (err, cohorts){
        if(err){
          console.log('messed');
        }else{
          res.json(cohorts);
        }
      })
    },
    new_cohort: function(req, res){
      if(req.body.date === undefined){
        console.log('fail, need start date');
        res.json({error: 'You must enter a start date!'});
      }else{
        Cohort.findOne({date: req.body.date}, function(err, data){
          if(data === null){
            console.log('saving');
            var new_cohort = new Cohort(req.body);
            new_cohort.save(function(err){
              if(err){
                console.log('still messed');
              }else{
                res.redirect('/cohorts');
              }
            });
          }else{
            res.json({error: 'That cohort exists, dummy!'})
          }
        })
      }
    }
  }
})();
