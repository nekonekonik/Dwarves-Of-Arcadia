'use strict';

/**
 * @ngdoc function
 * @name dwarvesOfArcadiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dwarvesOfArcadiaApp
 */
angular.module('dwarvesOfArcadiaApp')
  .controller('MainCtrl', function ($scope, socket) {
      $scope.join = function() {
        socket.emit('join', {name: $scope.name});
        console.log('here');
        console.log($scope.name);
      };

      socket.on('joinSuccessful', function(data) {
        console.log(data);
        $scope.players = data;
        console.log($scope.players);
      });
  });
