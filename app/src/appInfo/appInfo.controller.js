/**
 * @ngdoc controller
 * @name app.appInfo.controller:AppInfo
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.appInfo')
		.controller('AppInfo', AppInfo);

  /* @ngInject */
	function AppInfo(storage,service){
		var vm = this;
    var params = {apiKey:storage.appConstants.applications[0].apiKey};
    vm.dataLoading = service.httpCall(service.AppInfo.get(params)).success(function(data){
      vm.appInfo= data.application;
    });
	}

}());
