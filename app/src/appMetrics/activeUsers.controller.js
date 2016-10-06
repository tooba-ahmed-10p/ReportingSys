/**
 * @ngdoc controller
 * @name app.appMetrics.controller:ActiveUsers
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.appMetrics')
    .controller('ActiveUsers', ActiveUsers);

  /* @ngInject */
  function ActiveUsers(service, storage, $q) {
    var vm = this;
    var pageUrls = [];
    vm.reportData = [];
    vm.dailyData = [];
    vm.weeklyData = [];
    vm.monthlyData = [];
    /////////////////////
    vm.initializeChartDaily = initializeChartDaily;
    vm.initializeChartByWeek = initializeChartByWeek;
    vm.initializeChartByMonth = initializeChartByMonth;

    /////////////////////

    function _getUrls() {
      _.map(storage.appConstants.applications, function (app) {
        var paramsDaily = {apiKey: app.apiKey, startDate: '2016-07-01', endDate: '2016-10-05'};
        var paramsWeekly = {apiKey: app.apiKey, startDate: '2016-08-01', endDate: '2016-10-05'};
        var paramsMonthly = {apiKey: app.apiKey, startDate: '2016-05-01', endDate: '2016-10-05'};
        pageUrls.push({url:service.ActiveUsers.daily(paramsDaily),app:app.name});
        pageUrls.push({url:service.ActiveUsers.byWeek(paramsWeekly),app:app.name});
        pageUrls.push({url:service.ActiveUsers.byMonth(paramsMonthly),app:app.name});
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
      $q.all(promises).then(function(data){
        vm.reportData= data;
        vm.reportDataGroupedBy = _.groupBy(vm.reportData,'@metric');
        initializeChartDaily();
        initializeChartByWeek();
        initializeChartByMonth();
      });
    }

    function _getSeries(data, startMonth, endMonth) {
      return _.map(data, function (data) {
        return {
          name: data.application,
          data: _.map(data.day, function (value) {
            return parseInt(value['@value']);
          }),
          pointStart: Date.UTC(2016, startMonth, 1),
          pointInterval: 24 * 3600 * 1000,
          pointEnd: Date.UTC(2016, endMonth, 1)

        };
      });
    }

    function initializeChartDaily() {
      new Highcharts.Chart({
        chart: {
          renderTo: 'daily',
          type: 'line'
        },
        title: {
          text: 'Total number of unique users who accessed the application per day',
          x: -20 //center
        },
        xAxis: {
          tickInterval: 24 * 3600 * 1000,
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
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: _getSeries(vm.reportDataGroupedBy.ActiveUsersByDay, 6, 9)

      });
    }

    function initializeChartByWeek() {
      new Highcharts.Chart({
        chart: {
          renderTo: 'weekly',
          type: 'line'
        },
        title: {
          text: 'By Week',
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
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: _getSeries(vm.reportDataGroupedBy.ActiveUsersByWeek, 7, 9)

      });
    }

    function initializeChartByMonth() {
      new Highcharts.Chart({
        chart: {
          renderTo: 'monthly',
          type: 'line'
        },
        title: {
          text: 'By Month',
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
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: _getSeries(vm.reportDataGroupedBy.ActiveUsersByMonth, 4, 9)

      });
    }

    _initialize();


  }

}());
