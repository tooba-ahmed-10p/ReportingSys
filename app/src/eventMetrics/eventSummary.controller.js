/**
 * @ngdoc controller
 * @name app.eventMetrics.controller:EventSummary
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.eventMetrics')
		.controller('EventSummary', EventSummary);

  /* @ngInject */
	function EventSummary(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.eventMetrics.controller:EventSummary
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
