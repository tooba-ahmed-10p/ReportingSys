/**
 * @ngdoc controller
 * @name app.appMetrics.controller:Session
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.appMetrics')
		.controller('Session', Session);

  /* @ngInject */
	function Session(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.appMetrics.controller:Session
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
