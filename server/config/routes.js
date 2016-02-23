var Students = require('./../controllers/Students.js');
var Cohorts = require('./../controllers/Cohorts.js');
var Blasts = require('./../controllers/Blasts.js');

module.exports = function(app){

  app.get('/students', function(req, res){
    Students.index(req, res);
  })

  app.get('/student/:_id', function(req, res){
    Students.get_one_with_id(req, res);
  })

  app.get('/student', function(req, res){
    Students.get_one_without_info(req, res);
  })

  app.post('/student/update', function(req, res){
    console.log(req.body);
    Students.update_one_with_id(req, res);
  })

  app.post('/student/init', function(req, res){
    Students.initialize_student(req, res);
  })

  app.get('/cohorts', function(req, res){
    Cohorts.index(req, res);
  })

  app.post('/cohort/add', function(req, res){
    Cohorts.new_cohort(req, res);
  })

}
