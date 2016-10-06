(function () {
  'use strict';

  angular
    .module('app.shell')
    .controller('Header', Header);
  /*jshint maxparams: 8*/
  /* @ngInject */
  function Header(mainMenu,storage) {
    var vm = this;
    /////////////////////
    vm.menu = mainMenu;
    vm.applications = storage.appConstants.applications;
    vm.selectedApps = storage.appConstants.applications;

  }
}());
