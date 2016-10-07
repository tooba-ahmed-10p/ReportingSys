/**
 * @ngdoc controller
 * @name app.dashboard.controller:Dashboard
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.dashboard')
    .controller('Dashboard', Dashboard);

  /* @ngInject */
  function Dashboard(service, storage, $q) {
    var vm = this;
    var pageUrls = [];
    vm.reportData = [];

    /////////////////////
    vm.initializeChartActiveUsers = initializeChartActiveUsers;
    /////////////////////

    function _getUrls() {
      _.map(storage.appConstants.applications, function (app) {
        var paramsDaily = {apiKey: app.apiKey, startDate: '2016-09-01', endDate: '2016-10-05'};
        var paramsMonthly = {apiKey: app.apiKey, startDate: '2016-08-01', endDate: '2016-10-05'};
        var params = {apiKey: app.apiKey, startDate: '2016-07-01', endDate: '2016-10-05'};
        pageUrls.push({url: service.ActiveUsers.daily(paramsDaily), app: app.name});
        pageUrls.push({url: service.ActiveUsers.byMonth(paramsMonthly), app: app.name});
        pageUrls.push({url: service.Session.sessionLength(app.apiKey, '2016-10-01', '2016-10-03'), app: app.name});
        pageUrls.push({url: service.EventMetrics.summary(params), app: app.name});
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
        //Active Users Per Day
        initializeChartActiveUsers('ActiveUsersDApp1', 8, 9, 1000, vm.reportDataGroupedBy.ActiveUsersByDay[0]);
        initializeChartActiveUsers('ActiveUsersDApp2', 8, 9, 1000, vm.reportDataGroupedBy.ActiveUsersByDay[1]);
        initializeChartActiveUsers('ActiveUsersDApp3', 8, 9, 1000, vm.reportDataGroupedBy.ActiveUsersByDay[2]);
        //Active Users By Month
        initializeChartActiveUsers('ActiveUsersMApp1', 7, 9, 30000, vm.reportDataGroupedBy.ActiveUsersByMonth[0]);
        initializeChartActiveUsers('ActiveUsersMApp2', 7, 9, 30000, vm.reportDataGroupedBy.ActiveUsersByMonth[1]);
        initializeChartActiveUsers('ActiveUsersMApp3', 7, 9, 30000, vm.reportDataGroupedBy.ActiveUsersByMonth[2]);
        //SessionLength
        initializePieChart('sessionLengthDay1', vm.reportDataGroupedBy.AvgSessionLength[0]);
        initializePieChart('sessionLengthDay2', vm.reportDataGroupedBy.AvgSessionLength[1]);
        initializePieChart('sessionLengthDay3', vm.reportDataGroupedBy.AvgSessionLength[2]);
        //EventDetails
        initializeBarChart('eventsApp1',vm.reportDataGroupedBy.undefined[0]);
        initializeBarChart('eventsApp2',vm.reportDataGroupedBy.undefined[1]);
        initializeBarChart('eventsApp3',vm.reportDataGroupedBy.undefined[2]);
      });
    }

    function initializeChartActiveUsers(renderTo, startMonth, endMonth, pointInterval, data) {
      new Highcharts.Chart({
        chart: {
          renderTo: renderTo,
          type: 'line'
        },
        title: {
          text: data.application,
          x: -20 //center
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%d %b %Y'    //ex- 01 Jan 2016
          }
        },
        yAxis: {
          title: {
            text: 'Value'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          valueSuffix: 'Visits'
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'app',
          data: _.map(data.day, function (value) {
            return parseInt(value['@value']);
          }),
          pointStart: Date.UTC(2016, startMonth, 1),
          pointInterval: 24 * 3600 * pointInterval,
          pointEnd: Date.UTC(2016, endMonth, 1)
        }]

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
          text: data.application
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

    function initializeBarChart(renderTo, data) {
      new Highcharts.Chart({
        chart: {
          renderTo: renderTo,
          type: 'column'
        },
        title: {
          text: data.application
        },

        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total Occurrences'
          }

        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }
          }
        },
        series: [{
          name: 'Events',
          colorByPoint: true,
          data: _getHighChartsDataForEvents(data.event)
        }]
      });

    }

    function _getHighChartsDataForEvents(eventsData) {
      return _.sortBy(_.map(eventsData, function (event) {
          return {
            name: event['@eventName'],
            y: parseInt(event['@totalCount'])
          };

      }),function(num){
        return -num.y;
      }).slice(0, 5);
    }

    _initialize();

  }

}());
