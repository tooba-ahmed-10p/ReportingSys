/**
 * @ngdoc overview
 * @name app.appMetrics
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.appMetrics', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    $stateProvider
      .state('Header.AppMetrics', {
        url: '/appMetrics',
        template: '<ui-view></ui-view>',
        authenticate: true,
        abstract: true
      })
      .state('Header.AppMetrics.ActiveUsers', {
        url: '/activeUsers',
        templateUrl: 'src/appMetrics/activeUsers.html',
        controller: 'ActiveUsers as vm',
        authenticate: true
      })
      .state('Header.AppMetrics.Session', {
        url: '/session',
        templateUrl: 'src/appMetrics/session.html',
        controller: 'Session as vm',
        authenticate: true
      })
  }

}());
