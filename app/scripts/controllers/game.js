'use strict';

/**
 * @ngdoc function
 * @name dwarvesOfArcadiaApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the dwarvesOfArcadiaApp
 */
angular.module('dwarvesOfArcadiaApp')
  .controller('GameCtrl', function ($rootScope, $scope, socket, session) {

    // variables
    // in game seq
    $scope.playersNames = [];
    // in game view seq
    $scope.playersOnGameSeq = [];
    $scope.players = { you: {name: '', rsc: {
				      'Mithril': 0,
				      'Gold': 3,
				      'TreasureMine': 0,
				      'Treasure': 0,
				      'GoldMine': 0,
				      'MithrilForge': 0,
				      'IronForge': 0,
				      'Wood': 3,
				      'LumberMill': 0,
				      'Iron': 3,
				      'Lumber': 0,
				      'Woodmill': 0
				    }
				 },
      					one: {name: '', rsc: {
				      'Mithril': 0,
				      'Gold': 3,
				      'TreasureMine': 0,
				      'Treasure': 0,
				      'GoldMine': 0,
				      'MithrilForge': 0,
				      'IronForge': 0,
				      'Wood': 3,
				      'LumberMill': 0,
				      'Iron': 3,
				      'Lumber': 0,
				      'Woodmill': 0
				    }
				},
      					two: {name: '', rsc: {
				      'Mithril': 0,
				      'Gold': 3,
				      'TreasureMine': 0,
				      'Treasure': 0,
				      'GoldMine': 0,
				      'MithrilForge': 0,
				      'IronForge': 0,
				      'Wood': 3,
				      'LumberMill': 0,
				      'Iron': 3,
				      'Lumber': 0,
				      'Woodmill': 0
				    }
				},
      					three: {name: '', rsc: {
				      'Mithril': 0,
				      'Gold': 3,
				      'TreasureMine': 0,
				      'Treasure': 0,
				      'GoldMine': 0,
				      'MithrilForge': 0,
				      'IronForge': 0,
				      'Wood': 3,
				      'LumberMill': 0,
				      'Iron': 3,
				      'Lumber': 0,
				      'Woodmill': 0
				    }
				}
      				};
    console.log($scope);

    $scope.generators = [
      "Woodmill", "Iron Forge", "Gold Mine", "Lumbermill", "Mithril Forge", "Treasure Mine"
    ];

    // TRADE
    $scope.trade = function() {
      $scope.userAction = 'trade';
    };

    $scope.tradeClicked = function() {
      var players = [];
      if ($scope.userAction === 'tradeBank') {
  	      socket.emit('move', {from: session.name(), 
						action:'TradeWithBank',
						want: {},
						target: {}
					});
      } else if ($scope.userAction === 'tradeGlobal') {
  	      players = angular.copy($scope.playersNames);
	      players.splice(session.name(), 1);
	      socket.emit('move', {from: session.name(), 
	      						to: players, 
	      					action:'TradeRequest',
	      					want: {},
	      					target: {}
	      				});
      } else if ($scope.userAction === 'tradeOneOne') {
      	 // TODO: be able to add or decrease players ()
      	 if ($scope.trade.btn0.state) {
      	 	players.push($scope.playersOnGameSeq[0]);
      	 } else if ($scope.trade.btn1.state) {
      	 	players.push($scope.playersOnGameSeq[1]);
      	 } else if ($scope.trade.btn2.state) {
      	 	players.push($scope.playersOnGameSeq[2]);
      	 }

        socket.emit('move', {from: session.name(), 
      						to: players, 
      					action:'TradeRequest',
      					want: {},
      					target: {}
      				});
      } else {
      	console.log('error in UI');
      }

    };

    $scope.tradeOneOneView = function() {
      $scope.userAction = 'tradeOneOne';
    };

    $scope.tradeGlobalView = function() {
      $scope.userAction = 'tradeGlobal';
    };

    $scope.tradeBankView = function() {
      $scope.userAction = 'tradeBank';
    };



    $scope.getSellingToPlayer = function(player){
      $scope.sellingToPlayer = player;
    }        

    $scope.showCalculator = function(player, tradeType) {
      if (player && tradeType){
        $scope.currentActiveTrader = player;
        $scope.currentTradeType = tradeType;
        $scope.userAction = 'showCalculator';
      } else {
        alert("Empty player");
      }
    }

    $scope.playerResourcesForTrade = {};
    $scope.opponentResourcesForTrade = {};
    $scope.closeCalculator = function(tradeType) {
      if ($scope.currentActiveTrader == 'Me') {
        $scope.playerResourcesForTrade = angular.copy($scope.totalResources);
        var tradeOffer = "";
        for (var resourceName in $scope.playerResourcesForTrade) {
            var resource = $scope.playerResourcesForTrade[resourceName];
            if (resource.amount > 0) {
              tradeOffer += resource.amount + " " + resourceName + ", ";
            };
        }
        if (tradeOffer.length > 0) {
          tradeOffer = tradeOffer.substring(0,tradeOffer.length - 2);
        };
        console.log(tradeOffer);
        $scope.playerTradeOffer = tradeOffer;
      } else {
        $scope.opponentResourcesForTrade = angular.copy($scope.totalResources);
        var tradeOffer = "";
        for (var resourceName in $scope.opponentResourcesForTrade) {
            var resource = $scope.opponentResourcesForTrade[resourceName];
            if (resource.amount > 0) {
              tradeOffer += resource.amount + " " + resourceName + ", ";
            };
        }
        if (tradeOffer.length > 0) {
          tradeOffer = tradeOffer.substring(0,tradeOffer.length - 2);
        };
        console.log(tradeOffer);
        $scope.opponentTradeOffer = tradeOffer;
      }
      $scope.userAction = tradeType;
    }

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
      console.log('buildGenerator');
    };

    $scope.buildGenerator = function(generator) {
      socket.emit('move', {from: session.name(), target: generator, action: 'Build'});
    };

    $scope.upgradeResourceView = function () {
      $scope.userAction = 'upgradeResource';
      console.log('upgradeRes');
    };

    $scope.upgradeResource = function (resource) {
      socket.emit('move', {from: session.name(), target: resource, action: 'UpgradeResource'});
    };

    $scope.upgradeGeneratorView = function () {
      $scope.userAction = 'upgradeGenerator';
      console.log('upgradeGenerator');
    };

    $scope.upgradeGenerator = function (generator) {
      socket.emit('move', {from: session.name(), target: generator, action: 'UpgradeResourceGenerator'});
    };


    // DESTROY
    $scope.destroy = function() {
      $scope.userAction = 'destroy';
    };

    $scope.showDestroy = function(destroyPlayer) {
      $scope.userAction = 'showDestroy';
      $scope.destroyNumber = destroyPlayer;
      $scope.toDestroyPlayer = $scope.playersOnGameSeq[destroyPlayer];
    };

    $scope.destroyResourceButton = function(index) {
      $scope.toDestroyGenerator = $scope.generators[index];
      $scope.destroyDescription = "You are destroying his " + $scope.toDestroyGenerator; 
    };

    $scope.destroyGenerator = function(generator, toPlayer) {
      if(toPlayer && generator){
    	 socket.emit('move', {from: session.name(), target: generator, action: 'Destroy', to: toPlayer});
      } else {
        console.log("Empty player or empty generator fields");
      }
    };


    //EVENT CARDS
    //stub for cards
    $scope.cards = { 1: {name: 'CardOne', description: 'Card One Description', cardColor: 'blue'},
              2: {name: 'CardTwo', description: 'Card Two Description', cardColor: 'red'},
              3: {name: 'CardThree', description: 'Card Three Description', cardColor: 'brown'}
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
      console.log(data);
      angular.forEach(data, function(playerRsc, playerName){
      	console.log(playerRsc);
      	console.log(playerName);
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

      console.log('players', $scope.players);
      console.log($scope.players.you.rsc.Wood);
      $scope.players.you.rsc.Mithril = 100;

      $scope.$apply(function () {
      	$scope.players = { you: {name: $scope.playersOnGameSeq[0], rsc: data[$scope.playersOnGameSeq[0]]},
      					one: {name: $scope.playersOnGameSeq[1], rsc: data[$scope.playersOnGameSeq[1]]},
      					two: {name: $scope.playersOnGameSeq[2], rsc: data[$scope.playersOnGameSeq[2]]},
      					three: {name: $scope.playersOnGameSeq[3], rsc: data[$scope.playersOnGameSeq[3]]}
      				};
      });

      console.log($scope);
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
        	angular.forEach(data.update_res, function(playerRsc, playerName) {
        		angular.forEach($scope.players, function(player) {
        			if (playerName === player.name) {
        				player.rsc = playerRsc;
 						console.log(playerName);
 						console.log(player.rsc);
        			}
        		});
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
