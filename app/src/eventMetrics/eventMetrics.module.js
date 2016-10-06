/**
 * @ngdoc overview
 * @name app.eventMetrics
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.eventMetrics', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider) {
    $stateProvider
      .state('Header.EventMetrics', {
        url: '/eventMetrics',
        template: '<ui-view></ui-view>',
        authenticate: true,
        abstract: true
      })
      .state('Header.EventMetrics.EventSummary', {
        url: '/eventSummary',
        templateUrl: 'src/eventMetrics/eventSummary.html',
        controller: 'EventSummary as vm',
        authenticate: true
      });
  }

}());
