// ref: https://docs.strongloop.com/display/MSG/Building+a+real-time+app+using+socket.io+and+AngularJS

'use strict';
angular.module('dwarvesOfArcadiaApp')
 
//Here LoopBackAuth service must be provided as argument for authenticating the user
.factory('socket', function(socketFactory, constants){

    var ioSocket = io.connect(constants.url);
    
    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return socket;
});