'use strict';

/**
 * @ngdoc function
 * @name dwarvesOfArcadiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dwarvesOfArcadiaApp
 */
angular.module('dwarvesOfArcadiaApp')
  .controller('MainCtrl', function ($scope, socket, session) {

      $scope.join = function() {
        session.setName($scope.name);
        socket.emit('join', {name: session.name()});
        console.log('here');
        console.log($scope.name);
      };

      socket.on('joinSuccessful', function(data) {
        $scope.players = data;
        console.log($scope.players);
      });

      socket.on('joinFailed', function(err) {
        $scope.loginError = err;
        console.log(err);
      });

      socket.on('playerLeft', function(data) {
        $scope.players = data;
        console.log($scope.players);
      });

      window.onbeforeunload = function(/*event*/) {
        //TODO: add notification to user before leaving
        console.log('leave game');
        socket.emit('leave', {name: session.name()});
      };
  });
