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
	function EventSummary(storage,service,$q){
		var vm = this;
    var pageUrls = [];
    vm.eventSummary = [];
    /////////////////////

    /////////////////////

    function _getUrls() {
      _.map(storage.appConstants.applications, function (app) {
        var params = {apiKey: app.apiKey, startDate: '2016-07-01', endDate: '2016-10-05'};
        pageUrls.push({url:service.EventMetrics.summary(params),app:app.name});
      });
    }

    function _initialize() {
      _getUrls();
      var promises = _.map(pageUrls, function (url,index) {
        return service.asyncCall(url.url,index).then(function (response) {
          response.application=url.app;
          return response;
        });
      });
      vm.dataLoading = $q.all(promises).then(function(data){
        vm.eventSummary=_.flatten(_.map(data,function(main){
          return  _.map(main.event,function(eventInfo){
            eventInfo.application=main.application;
            return eventInfo;
          });
        }));
      });
    }

    _initialize();
	}

}());
