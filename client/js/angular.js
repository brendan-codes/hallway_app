var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider){
  $routeProvider
  .when('/', {templateUrl: 'partials/main.html'})
  .when('/student/:_id', {templateUrl: 'partials/student.html'})
  .when('/update', {templateUrl: 'partials/update.html'})
  .when('/cohort', {templateUrl: 'partials/cohort.html'})
  .otherwise({redirectTo: '/'})
});

myApp.factory('UpdateFactory', function($http){
  var factory = {};

  factory.change_black_belt_status = function(data, callback){
    //console.log(data);
    //callback(data);
  }

  return factory;
})


myApp.factory('MainFactory', function($http){
  var factory = {};

  factory.get_all_students = function(callback){
    $http.get('/students').success(function(output){
      console.log(output);
      callback(output);
    })
  };

  factory.get_one_without_info = function(callback){
    $http.get('/student').success(function(output){
      console.log(output);
      callback(output);
    })
  };


  factory.get_cohorts = function(callback){
    $http.get('/cohorts').success(function(output){
      callback(output);
    })
  };

  factory.add_cohort = function(data, callback){
    $http.post('/cohort/add', data).success(function(output){
      console.log(output);
      callback(output);
    })
  }

  factory.update_one_with_id = function(data, callback){
    $http.post('/student/update', data).success(function(output){
      callback(output);
    })
  };

  factory.get_one_with_id = function(data, callback){
    $http.get('/student/' + data._id).success(function(output){
      callback(output);
    })
  };


  return factory;
})

myApp.controller('DashboardController', function($scope, MainFactory){

  MainFactory.get_all_students(function(data){
    $scope.students = data;
  })

})

myApp.controller('StudentController', function($scope, $routeParams, MainFactory, UpdateFactory){

  $scope.required = true;

  MainFactory.get_cohorts(function(data){
    //console.log(data);
    $scope.cohorts = data;
  })

  $scope.changeBelt = function(){
  //  console.log($scope.student)
    UpdateFactory.change_black_belt_status($scope.updated_student, function(data){
      console.log('Coming back with data');
    })
  }



  if($routeParams._id){
    MainFactory.get_one_with_id({_id: $routeParams._id}, function(data){
      console.log(data);
      $scope.student = data;
    })
  }

})

myApp.controller('UpdateController', function($scope, MainFactory){

  MainFactory.get_cohorts(function(data){
    console.log(data);
    $scope.cohorts = data;
  })


  MainFactory.get_one_without_info(function(data){
    if(data.img){
      $scope.student = data;
    }else if(data.flash){
      $scope.flash = data.flash;
    }else{
      console.log('Fucked');
    }
  })

  $scope.updateStudent = function(id){
    $scope.updated_student._id = id;
    console.log($scope.updated_student);
    MainFactory.update_one_with_id($scope.updated_student, function(data){
      if(data.img){
        //console.log(data);
        $scope.student = data;
        $scope.updated_student.name = '';
      }else if(data.flash){
        $scope.flash = data.flash;
      }else{
        console.log('Fucked');
      }
    })

  }

})

myApp.controller('StudentsController', function($scope, MainFactory){

  $scope.addCohort = function(){
    MainFactory.add_cohort($scope.new_cohort, function(data){
      if(data.error){
        $scope.error = data.error;
      }else{
        $scope.cohorts = data;
        $scope.error = undefined;
      }
    })
  }
})
