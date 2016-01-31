'use strict';

/**
 * @ngdoc function
 * @name dwarvesOfArcadiaApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the dwarvesOfArcadiaApp
 */
angular.module('dwarvesOfArcadiaApp')
  .controller('GameCtrl', function ($scope, socket, session) {

    // variables
    // in game seq
    $scope.playersNames = [];
    // in game view seq
    $scope.playersOnGameSeq = [];
    $scope.players = {};

    // TRADE
    $scope.trade = function() {
      $scope.userAction = 'trade';
    };

    $scope.tradeOneOneView = function() {
      $scope.userAction = 'tradeOneOne';
    };

    $scope.tradeOneOne = function() {
      // TODO: get selected players
      var players = [];
      socket.emit('move', {from: session.name(), 
      						to: players, 
      					action:'TradeRequest',
      					want: {},
      					target: {}
      				});
    };

    $scope.tradeGlobalView = function() {
      $scope.userAction = 'tradeGlobal';
    };

    $scope.tradeGlobal = function() {
      var players = angular.copy($scope.playersNames);
      players.splice(session.name(), 1);
      socket.emit('move', {from: session.name(), 
      						to: players, 
      					action:'TradeRequest',
      					want: {},
      					target: {}
      				});
    };


    $scope.tradeBankView = function() {
      $scope.userAction = 'tradeBank';
    };

    $scope.tradeBank = function() {
      socket.emit('move', {from: session.name(), 
							action:'TradeWithBank',
							want: {},
							target: {}
						});
    };


    // GATHER
    $scope.gather = function() {
      $scope.userAction = 'gather';
      console.log('gather');
      socket.emit('move', {action: 'Gather', from: session.name()});
    };

    // BUILD
    $scope.build = function() {
      $scope.userAction = 'build';
    };

    $scope.buildGeneratorView = function() {
      $scope.userAction = 'buildGenerator';
      console.log("buildGenerator");
    };

    $scope.buildGenerator = function(generator) {
      socket.emit('move', {from: session.name(), target: generator, action: 'Build'});
    };

    $scope.upgradeResourceView = function () {
      $scope.userAction = 'upgradeResource';
      console.log("upgradeRes");
    };

    $scope.upgradeResource = function (resource) {
      socket.emit('move', {from: session.name(), target: resource, action: 'UpgradeResource'});
    };

    $scope.upgradeGeneratorView = function () {
      $scope.userAction = 'upgradeGenerator';
      console.log("upgradeGenerator");
    };

    $scope.upgradeGenerator = function (generator) {
      socket.emit('move', {from: session.name(), target: generator, action: 'UpgradeResourceGenerator'});
    };


    // DESTROY
    $scope.destroy = function() {
      $scope.userAction = 'destroy';
    };

    $scope.destroyGenerator = function(generator, toPlayer) {
    	socket.emit('move', {from: session.name(), target: generator, action: 'Destroy', to: toPlayer});
    };


    //EVENT CARDS
    //stub for cards
    $scope.cards = { 1: {name: "CardOne", description: "Card One Description", cardColor: "blue"},
              2: {name: "CardTwo", description: "Card Two Description", cardColor: "red"},
              3: {name: "CardThree", description: "Card Three Description", cardColor: "brown"}
            };

    $scope.hoverCard = function(cardNum) {
      $scope.cardDescription = $scope.cards[cardNum].description;
      $scope.showEventDescription = true;
    };

    $scope.unhoverCard = function() {
      $scope.showEventDescription = false;
    };


    // PLAYER
    socket.on('startGame', function(data) {
      angular.forEach(data, function(playerName, playerRsc){
      	console.log(playerRsc);
        $scope.playersNames.push(playerName);
      });

      // Algorithm to sequence players on the game
      var temp = angular.copy($scope.playersNames);
      for (var i=0; i<$scope.playersNames.length-1; i++) {
        console.log($scope.playersNames[i]);
        temp.push($scope.playersNames[i]);
      }
      var playerIndex = temp.indexOf(session.name());
      var numPlayers = 4;
      for (var j=playerIndex; j<numPlayers; j++) {
        $scope.playersOnGameSeq.push(temp[j]);
      }
      console.log($scope.playersOnGameSeq);
      $scope.players = { you: {name: $scope.playersOnGameSeq[0], rsc: data[$scope.playersOnGameSeq[0]]},
      					one: {name: $scope.playersOnGameSeq[1], rsc: data[$scope.playersOnGameSeq[1]]},
      					two: {name: $scope.playersOnGameSeq[2], rsc: data[$scope.playersOnGameSeq[2]]},
      					three: {name: $scope.playersOnGameSeq[3], rsc: data[$scope.playersOnGameSeq[3]]}
      				};
    });

    socket.on('playersBroadcast', function(data) {
      if (data) {
        if (data.action === 'YourTurn') {
        	if (data.to === session.name()) {
        		// TODO: enable button
        	} else {
        		// TODO: display who's turn
        	}
        } else if (data.action === 'Update') {
        	var fromPlayer = data.from;
        	angular.forEach($scope.players, function(player) {
        		if (player.name === fromPlayer ) {
        			player.rsc = data.update_res[fromPlayer];
        		}
        	});
          //assigning colors of cards in queue
          var temp = $scope.cards;
          for (var i = 1; i <= 3; i++){
            $scope.cards[i].cardColor = temp[(i+1)%3].cardColor;
          }
        } else if (data.action === 'TradeRequest') {
        	if (data.to.indexOf(session.name()) > -1) {
	        	// TODO: show modal for trade
	        	if ($scope.acceptTrade) {
	        		socket.emit('tradeOfferResp', {from: session.name(), resp: 'Accept'});
	        		$scope.acceptTrade = undefined;
	        	} else {
	        		socket.emit('tradeOfferResp', {from: session.name(), resp: 'Reject'});
	        		$scope.acceptTrade = undefined;
	        	}
	        }
        } else {
        	// ERROR?
        	//
        }
      }
    });
});
