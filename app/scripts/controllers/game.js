'use strict';

/**
 * @ngdoc function
 * @name dwarvesOfArcadiaApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the dwarvesOfArcadiaApp
 */
angular.module('dwarvesOfArcadiaApp')
  .controller('GameCtrl', function ($scope) {
    $scope.trade = function() {
      $scope.userAction = 'trade';
      console.log('trade');
    };

    $scope.gather = function() {
      $scope.userAction = 'gather';
      console.log('gather');
    };

    $scope.build = function() {
      $scope.userAction = 'build';
      console.log('build');
    };

    $scope.destroy = function() {
      $scope.userAction = 'destroy';
      console.log('destroy');
    };
});
