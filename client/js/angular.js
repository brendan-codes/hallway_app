var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize', 'dndLists']);

myApp.config(function ($routeProvider){
  $routeProvider
  .when('/', {templateUrl: 'partials/main.html'})
  .when('/blast', {templateUrl: 'partials/blast.html'})
  .when('/dashboard', {templateUrl: 'partials/student_dashboard.html'})
  .when('/student/:_id', {templateUrl: 'partials/student.html'})
  .when('/update', {templateUrl: 'partials/update.html'})
  .when('/cohort', {templateUrl: 'partials/cohort.html'})
  .when('/options', {templateUrl: 'partials/options.html'})
  .otherwise({redirectTo: '/'})
});

// myApp.factory('App', function(){
//   var factory = {};
//
//   factory.settings = {
//
//                      }
//
//   return factory;
// })

myApp.factory('UpdateFactory', function($http){
  var factory = {};

  factory.update_student = function(data, callback){
    $http.post('/student/update', data).success(function(output){
      //console.log(output);
    })
  }

  return factory;
})


myApp.factory('MainFactory', function($http){
  var factory = {};

  factory.groups = {

                    };

  factory.interval = 120000;

  factory.super_secret_hidden_hardcoded_frontend_insecure_password = null;

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

  factory.initialize_student = function(data, callback){
    $http.post('/student/init', data).success(function(output){
      callback(output);
    })
  };

  factory.get_one_with_id = function(data, callback){
    $http.get('/student/' + data._id).success(function(output){
      callback(output);
    })
  };

  factory.get_by_group = function(data, callback){
    console.log(data);
    $http.post('/cohort/date', data).success(function(output){
      callback(ouput);
    })
  }

  factory.get_blast = function(callback){
    $http.get('/blasts').success(function(output){
      callback(output);
    })
  }

  factory.update_blast = function(data, callback){
    $http.post('/blasts/update', data).success(function(output){
      callback(data);
    })
  }


  return factory;
})

myApp.controller('BlastController', function($scope, MainFactory){

  MainFactory.get_blast(function(data){
    console.log(data);
    $scope.blast = data;
  });

  $scope.changeBlast = function(){
    MainFactory.update_blast($scope.blast, function(data){
      $scope.blast = data;
    })
  }

})

myApp.controller('DashboardController', function($scope, MainFactory){

  var counter;

  // MainFactory.get_all_students(function(data){
  //   $scope.students = data;
  // });

  MainFactory.get_blast(function(data){
    console.log(data);
    $scope.blast = data;
  })

  MainFactory.get_cohorts(function(data){
    console.log(data);

    // for(cohort in data){
    //   console.log(data[cohort].date)
    //   console.log(MainFactory.groups[data[cohort].date])
    //   if(!MainFactory.groups[data[cohort].date]){
    //     console.log('tests')
    //     MainFactory.groups[data[cohort].date] = data[cohort].date;
    //   }
    // }
    $scope.cohorts = data;
    $scope.cohorts.unshift({date: 'black belt'})
    // counter = $scope.cohorts.length;
    console.log($scope.cohorts);
    MainFactory.get_by_group($scope.cohorts[$scope.cohorts.length - 1], function(data){
      $scope.students = data;
    })
  })

  function cycleGroup(arr){
    var temp = arr.pop();
    arr.unshift(temp);
  }






})

myApp.controller('StudentController', function($scope, $routeParams, MainFactory, UpdateFactory){

  // $(document).ready(function() {
  //   $('select').material_select();
  // });

  MainFactory.get_cohorts(function(data){
    //console.log(data);
    $scope.cohorts = data;
  })

  $scope.hasChanged = function(){
    console.log($scope.student);
    UpdateFactory.update_student($scope.student, function(data){
      $scope.student = data;
    });
  }



  if($routeParams._id){
    MainFactory.get_one_with_id({_id: $routeParams._id}, function(data){
      console.log('test');
      $scope.student = data;
    })
  }

})

myApp.controller('UpdateController', function($scope, MainFactory){

  // $(document).ready(function() {
  //   $('select').material_select();
  // });

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
      console.log('buggered');
    }
  })

  $scope.updateStudent = function(id){
    $scope.updated_student._id = id;
    console.log($scope.updated_student);
    MainFactory.initialize_student($scope.updated_student, function(data){
      if(data.img){
        //console.log(data);
        $scope.student = data;
        $scope.updated_student.name = '';
      }else if(data.flash){
        $scope.flash = data.flash;
        $scope.student = {};
      }else{
        console.log('buggered');
      }
    })

  }

  // $scope.rotate = function

})

myApp.controller('OptionsController', function($scope, MainFactory){

  MainFactory.get_cohorts(function(data){
    console.log(data);
    $scope.cohorts = data;
  })


})

myApp.controller('StudentsController', function($scope, MainFactory){

  MainFactory.get_cohorts(function(data){
    console.log(data);
    $scope.cohorts = data;
  })

  $scope.addCohort = function(){
    if($scope.new_cohort !== ''){
      MainFactory.add_cohort($scope.new_cohort, function(data){
        if(data.error){
          $scope.error = data.error;
        }else{
          $scope.cohorts = data;
          $scope.error = undefined;
        }
      })
    }
  }
})
