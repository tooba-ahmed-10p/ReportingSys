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
	function AppInfo(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.appInfo.controller:AppInfo
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
