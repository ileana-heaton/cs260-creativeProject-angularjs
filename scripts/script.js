/* global angular */
/* global $scope */
/* global location */

var myApp = angular.module('myApp',[]);
myApp.controller('myCtrl', function($scope, $http) {
  $scope.blanks = [];
  $scope.userWords = [];
  
  // console.log(form);
  var url = "https://madlibz.herokuapp.com/api/random?minlength=2";  
  $http.get(url).then(function(response){
      console.log(response); //figure out what info you want from the JSON
      // data binding = the reason why people love react, angular, etc.
      $scope.blanks = response.data.blanks;
      title = response.data.title;
      console.log(title);
      
      angular.copy($scope.blanks, $scope.userWords);
      for(var i=0; i<$scope.userWords.length;i++){
        $scope.userWords[i] = '';
      }
      
      console.log($scope.blanks);
      $scope.storyLines = response.data.value;
      console.log($scope.storyLines)
      // console.log($scope.story)
  });
  
  $scope.submitWords = function(userForm) {
    var formLength = $scope.userWords.length;
    console.log(formLength);
    console.log($scope.userWords);
    
    var storyStr = "";
    for(var i=0; i<formLength; i++){
      storyStr += $scope.storyLines[i] + $scope.userWords[i]; 
    }
    storyStr += $scope.storyLines[formLength];
    
    console.log(storyStr);
    $scope.story = storyStr;
    $scope.title = title;
    // console.log($scope.story);
    
//TODO: make reset button visible
  };
  
  
  $scope.resetPage = function() {
  //TODO: reload page (get new API call)
  //TODO: hide reset button again
  
    $http.get(url).then(function(response){
      console.log(response); //figure out what info you want from the JSON
      // data binding = the reason why people love react, angular, etc.
      $scope.blanks = response.data.blanks;
      title = response.data.title;
      console.log(title);
      
      angular.copy($scope.blanks, $scope.userWords);
      for(var i=0; i<$scope.userWords.length;i++){
        $scope.userWords[i] = '';
      }
      console.log($scope.blanks);
      $scope.storyLines = response.data.value;
      console.log($scope.storyLines)
      // console.log($scope.story)
    });
  };
});