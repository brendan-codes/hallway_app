var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider){
  $routeProvider
  .when('/', {templateUrl: 'partials/main.html'})
  .when('/student/:_id', {templateUrl: 'partials/student.html'})
  .when('/update', {templateUrl: 'partials/update.html'})
  .when('/cohort', {templateUrl: 'partials/cohort.html'})
  .otherwise({redirectTo: '/'})
});


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

myApp.controller('StudentController', function($scope, $routeParams, $location, MainFactory){

  if($routeParams._id){
    MainFactory.get_one_with_id({_id: $routeParams._id}, function(data){
      $scope.student = data;
    })
  }

})

myApp.controller('StudentsController', function($scope, MainFactory){

  // MainFactory.get_all_students(function(data){
  //   console.log(data);
  //   $scope.students = data;
  // })

  MainFactory.get_cohorts(function(data){
    $scope.cohorts = data;
  })

  MainFactory.get_one_without_info(function(data){
    if(data.name){
      $scope.student_sans = data;
    }else if(data.flash){
      $scope.flash = data.flash;
    }else{
      console.log('Fucked');
    }
  })

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
