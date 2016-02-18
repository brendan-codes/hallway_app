var Students = require('./../controllers/Students.js');
var Cohorts = require('./../controllers/Cohorts.js');

module.exports = function(app){

  app.get('/students', function(req, res){
    Students.index(req, res);
  })

  app.get('/student/:_id', function(req, res){
    Students.get_one_with_id(req, res);
  })

  app.get('/student', function(req, res){
    Students.get_one_for_info(req, res);
  })

  app.post('/student/update', function(req, res){
    Student.update_one_with_id(req, res);
  })

  app.get('/cohorts', function(req, res){
    Cohorts.index(req, res);
  })

  app.post('/cohort/add', function(req, res){
    Cohorts.new_cohort(req, res);
  })

}
