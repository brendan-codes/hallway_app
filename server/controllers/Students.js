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
          //  console.log(all_students);
            res.json(all_students)
          }
        })
      },
      get_one_without_info: function(req, res){
        Student.findOne({needs_info: true}, function(err, student){
          if(err){
            console.log('all gunked to hell')
            res.end();
          }else if(student){
            //console.log(student);
            res.json(student);
          }else{
            res.json({flash: 'No more students to update!'});
          }
        })
      },
      initialize_student: function(req, res){
        Student.update({_id: req.body._id}, {name: req.body.name, cohort: req.body.cohort, needs_info: false, first_stack: {stack: req.body.first_stack}}, function(err, updated_student){
          if(err){
            console.log(err);
            res.end('fuuuu');
          }else{
            //console.log(updated_student);
            res.redirect('/student');
          }
        })


      },
      get_one_with_id: function(req, res){
        Student.findOne({_id: req.params._id}, function(err, student){
          if(err){
            console.log(err);
            res.end('darn');
          }else{
            console.log(student);
            res.json(student);
          }
        })
      },
      update_one_with_id: function(req, res){
        Student.update({_id: req.body._id}, req.body, function(err, student){
          if(err){
            console.log(err);
            res.end()
          }else{
            console.log(student);
            res.end();
          }
        })

      },
      get_group_by_start_date: function(req, res){
        console.log(req.body);
        console.log('started to get groups')
        if(req.body.date !== 'Black Belt'){
          console.log('getting students');
          Student.find({cohort: req.body.date}, function(err, students){
            //console.log(!students.length);
            if(!students.length){
              console.log('error');
              res.json({error: 'error'})
            }else{
              console.log('got students!')
              console.log(students);
              res.json(students);
            }
          })
        }else{
          console.log('getting black belts')
          Student.find({black_belt: true}, function(err, students){
            // console.log(students);
            if(students.length < 1){
              console.log('error');
              res.json({error: 'error'})
            }else{
              console.log('got belts!')
              res.json(students);
            }
          })
        }
      },
      get_first_group: function(req, res){
        Cohort.findOne({}, function(err, cohort){
          console.log(cohort);
          Student.find({cohort: cohort.date}, function(err, students){
            console.log(students);
            if(!students){
              res.json({error: 'error'})
            }else{
              res.json(students);
            }
          })
        })
      }

    }

})();
