var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {   

  $scope.title = "edureka! MEAN Application - Employee Directory App";

  var updateView = function(){
    $http.get('/employee').then(function (response){
      $scope.employees = response.data; 
      $scope.employee = {
        name : '',
        email : '',
        dob : '',
        department : '',
        gender : '',
        age : ''
      };
    },function (error){
      console.log(error);
    });
  };

  updateView();
  
  $scope.addEmployee = function() {

    //handling Age with DOB
    setAge();
    $http.post('/employee', $scope.employee).then(function (response){
      updateView();
    },function (error){
      console.log(error);
    });
  };
  
  $scope.removeEmployee = function(id) {
    $http.delete('/employee/' + id).then(function (response){
      updateView();
    },function (error){
      console.log(error);
    });
  };
  
  $scope.editEmployee = function(id) {
    $http.get('/employee/' + id).then(function (response){
      $scope.employee = response.data;
    },function (error){
      console.log(error);
    });
 };
  
  $scope.updateEmployee = function() {
    //handling Age with DOB
    setAge();
    $http.put('/employee/' + $scope.employee._id, $scope.employee).then(function (response){
      updateView();
    },function (error){
      console.log(error);
    });
  };


  function setAge(){
    var dob = $scope.employee.dob;
    var now = new Date();
    var birthdate = dob.split("-");
    var born = new Date(birthdate[0], birthdate[1]-1, birthdate[2]);
    age=get_age(born,now);
   
    console.log(birthdate[2]+" : "+birthdate[1]+" : "+birthdate[0]);
    $scope.employee.age = age;
    console.log(age);
  }

  function get_age(born, now) {
    var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
    if (now >= birthday) 
    return now.getFullYear() - born.getFullYear();
    else
    return now.getFullYear() - born.getFullYear() - 1;
  }
    
}]);