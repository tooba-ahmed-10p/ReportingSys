(function () {

  'use strict';

  angular
    .module('app.common')
    .directive('ngMetis', ngMetis);
  function ngMetis($timeout){
    return {
      restrict: 'A',
      link: function(scope, el, atts) {
        $timeout(function () {
          angular.element(el).metisMenu();
        }, 0);
      }
    };

  }

}());
