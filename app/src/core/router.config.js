/**
 * @ngdoc overview
 * @name app.core
 * @description Configuration block for routing
 */

(function () {

  'use strict';

  angular.module('app.core')
    .config(configuration)
    .run(routingEvents);

  /*jshint maxparams: 7*/
  /* @ngInject */
  function configuration($urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  }


  function routingEvents($rootScope,$state) {
    //on routing error
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
      event.preventDefault();
      $state.go('Header.NotFound');
    });

    //on routing error
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      //do some title setting
      $rootScope.pageTitle = toState.title || 'Reporting System';
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      $state.go('Header.AccessDenied');
    });

  }

}());
