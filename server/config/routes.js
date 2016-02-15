var Students = require('./../controllers/Students.js');
var Cohorts = require('./../controllers/Cohorts.js');

module.exports = function(app){

  app.get('/students', function(req, res){

    res.end();
  })

  app.get('/student', function(req, res){

    res.end();
  })

  app.get('/student/update', function(req, res){

    res.end();
  })

  app.get('/cohorts', function(req, res){

    res.end();
  })

  app.get('/cohort/add', function(req, res){

    res.end();
  })
  // app.get('/', function (req, res){
  //   Students.get_all(req, res);
  // })
  //
  // app.get('/update', function (req, res){
  //   Students.get_one_for_info(req, res);
  // })
  //
  // app.post('/update/:id', function(req, res){
  //   console.log(req.body);
  //   Students.update_one_with_id(req, res);
  // })
  //
  // app.get('/cohorts', function(req, res){
  //   Cohorts.index(req, res);
  // })
  //
  // app.post('/cohorts/new', function(req, res){
  //   Cohorts.new_cohort(req, res);
  // })

}
