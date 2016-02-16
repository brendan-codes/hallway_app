var mongoose = require('mongoose');
var Student = mongoose.model('Student');
var Cohort = mongoose.model('Cohort');

module.exports = (function(){

    return {
      index: function(req, res){
        Student.find({needs_info: false}, function(err, all_students){
          if(err){
            console.log('fucked');
          }else{
            console.log(all_students);
            res.json(all_students)
          }
        })
      },
      get_one_for_info: function(req, res){
        Student.findOne({needs_info: true}, function(err, student){
          if(err){
            console.log('all gunked to hell')
            res.end();
          }else if(student){
            console.log(student);
            res.json(student);
          }else{
            res.json({flash: 'No more students to update!'});
          }
        })
      },
      update_one_with_id: function(req, res){
        Student.update({_id: req.params.id}, {name: req.body.name, cohort: req.body.cohort, needs_info: false}, function(err, updated_student){
          if(err){
            console.log(err);
            res.end('fuuuu');
          }else{
            console.log(updated_student);
            res.redirect('/update');
          }
        })


      },
      json_one_with_id: function(req, res){

      },
      json_all_with_bb: function(req, res){

      }

    }

})();
