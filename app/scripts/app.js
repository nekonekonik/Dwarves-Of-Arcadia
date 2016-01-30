'use strict';

/**
 * @ngdoc overview
 * @name dwarvesOfArcadiaApp
 * @description
 * # dwarvesOfArcadiaApp
 *
 * Main module of the application.
 */
angular
  .module('dwarvesOfArcadiaApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
