/**
 * @ngdoc overview
 * @name app.dashboard
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.dashboard', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider) {
    $stateProvider
      .state('Header.Dashboard', {
        url: '/dashboard',
        templateUrl: 'src/dashboard/dashboard.html',
        controller: 'Dashboard as vm',
        authenticate: true
      });
  }

}());
