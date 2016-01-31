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
    };

    $scope.gather = function() {
      $scope.userAction = 'gather';
    };

    $scope.build = function() {
      $scope.userAction = 'build';
    };

    $scope.destroy = function() {
      $scope.userAction = 'destroy';
    };

    $scope.tradeOneOne = function () {
      $scope.userAction = 'tradeOneOne';
    }

    $scope.tradeGlobal = function () {
      $scope.userAction = 'tradeGlobal';
    }

    $scope.tradeBank = function () {
      $scope.userAction = 'tradeBank';
    }

    $scope.upgradeResource = function () {
      $scope.userAction = 'upgradeResource';
      console.log("upgradeRes");
    }

    $scope.buildGenerator = function () {
      $scope.userAction = 'buildGenerator';
      console.log("buildGenerator");
    }

    $scope.upgradeGenerator = function () {
      $scope.userAction = 'upgradeGenerator';
      console.log("upgradeGenerator");
    }
});
