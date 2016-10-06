/**
 * @ngdoc overview
 * @name app.shell
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.shell', ['app.common', 'ui.bootstrap'])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider) {

    $stateProvider
      .state('Header', {
        abstract: true,
        templateUrl: 'src/shell/header.html',
        controller: 'Header as vm'
      });
  }

}());
