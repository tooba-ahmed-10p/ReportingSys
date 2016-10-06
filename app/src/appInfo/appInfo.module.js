/**
 * @ngdoc overview
 * @name app.appInfo
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.appInfo', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider) {
    $stateProvider
      .state('Header.AppInfo', {
        url: '/appInfo',
        templateUrl: 'src/appInfo/appInfo.html',
        controller: 'AppInfo as vm',
        authenticate: true
      });
  }

}());
