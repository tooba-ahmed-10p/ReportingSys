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
	function Session(service, storage, $q){
		var vm = this;
    var pageUrls = [];
    vm.reportData = [];

    /////////////////////
    function _getUrls() {
      _.map(storage.appConstants.applications, function (app) {
        pageUrls.push({url: service.Session.sessionLength(app.apiKey, '2016-10-01', '2016-10-03'), app: app.name});
      });
    }

    function _initialize() {
      _getUrls();
      var promises = _.map(pageUrls, function (url, index) {
        return service.asyncCall(url.url, index).then(function (response) {
          response.application = url.app;
          return response;
        });
      });
      vm.dataLoading = $q.all(promises).then(function (data) {
        vm.reportData = data;
        vm.reportDataGroupedBy = _.groupBy(vm.reportData, '@metric');
        //SessionLength
        initializePieChart('sessionLengthDay1',vm.reportDataGroupedBy.AvgSessionLength[0]);
        initializePieChart('sessionLengthDay2',vm.reportDataGroupedBy.AvgSessionLength[1]);
        initializePieChart('sessionLengthDay3',vm.reportDataGroupedBy.AvgSessionLength[2]);
      });
    }

    function initializePieChart(renderTo, data) {
      new Highcharts.Chart({
        chart: {
          renderTo: renderTo,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Avg Session Length Of ' + data.application
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y:.1f} min</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y:.1f} min',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [{
          name: 'App',
          colorByPoint: true,
          data: [{
            name: data.day[0]['@date'],
            y: data.day[0]['@value'] / 30
          }, {
            name: data.day[1]['@date'],
            y: data.day[1]['@value'] / 30
          },
            {
              name: data.day[2]['@date'],
              y: data.day[2]['@value'] / 30
            }]
        }]
      });
    }

    _initialize();

	}

}());
