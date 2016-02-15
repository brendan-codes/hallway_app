var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider){
  $routeProvider
  .when('/', {templateUrl: 'partials/main.html'})
  .when('/update', {templateUrl: 'partials/update.html'})
  .when('/cohort', {templateUrl: 'partials/cohort.html'})
  .otherwise({redirectTo: '/'})
});

myApp.factory('StudentsFactory', function($http){
  var factory = {};

  factory.get_all_students = function(callback){
    $http.get('/students').success(function(output){
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


  return factory;
})

myApp.controller('StudentsController', function($scope, StudentsFactory){

  StudentsFactory.get_cohorts(function(data){
    $scope.cohorts = data;
  })

  $scope.addCohort = function(){
    StudentsFactory.add_cohort($scope.new_cohort, function(data){
      if(data.error){
        $scope.error = data.error;
      }else{
        $scope.cohorts = data;
        $scope.error = undefined;
      }
    })
  }
})
