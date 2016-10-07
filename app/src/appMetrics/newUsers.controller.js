/**
 * @ngdoc controller
 * @name app.appMetrics.controller:NewUsers
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.appMetrics')
    .controller('NewUsers', NewUsers);

  /* @ngInject */
  function NewUsers(storage, service, $q) {
    var vm = this;
    var pageUrls = [];
    vm.eventSummary = [];

    /////////////////////

    function _getUrls() {
      _.map(storage.appConstants.applications, function (app) {
        var params = {apiKey: app.apiKey, startDate: '2016-09-01', endDate: '2016-10-05'};
        pageUrls.push({url: service.NewUsers.getAllUsers(params), app: app.name});
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
        vm.usersSummary = _.flatten(_.map(data, function (main) {
          return _.filter(main.country, function (eventInfo) {
            var country = _.findWhere(storage.countries, {code: eventInfo['@country']});
            if (country) {
              eventInfo['@country'] = country.name;
            }
            else {
              eventInfo['@country'] = 'Unknown';
            }
            eventInfo.application = main.application;
            return eventInfo;
          });
        }));
        vm.usersByApplication = _.groupBy(vm.usersSummary, 'application');
        initializeChart();
      });
    }


    function initializeChart() {
      new Highcharts.Chart({
        chart: {
          renderTo: 'newUsers',
          type: 'column'
        },
        title: {
          text: 'New Users Per Country'
        },
        xAxis: {
          categories: _.sortBy(_.pluck(storage.countries,'name').concat('Unknown'),function(country){return country;})
         },
        yAxis: {
          min: 0,
          title: {
            text: 'Count'
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series:_filterData( _getCategories(vm.usersByApplication))
      });
    }

    function _getCategories(data) {
      var seriesName = [];
      for (var i in data) {
        seriesName.push({
          name: i,
          data: _getSeriesData(vm.usersByApplication[i])
        });
      }
      return seriesName;
    }

    function _getSeriesData(data) {
      return _.map(_.groupBy(data, '@country'), function (item, key) {
        var value= _.reduce(_.flatten(_.map(item, function (a) {
          return _.map(a.day, function (b) {
            return parseInt(b['@value']);
          });
        })), function (memo, num) {
          return memo + num;
        }, 0);

        return {
          name: key,
          y: value ? value : 0
        };
      });

    }

    function _filterData(finalData){
      var countries =_.pluck(storage.countries,'name').concat('Unknown');
      return _.map(finalData,function(app){
        _.map(countries,function(country){
          app.data= _.sortBy(_.filter(app.data,function(a){
            if(a.name === country) {
              return a;
            }
           else{
              return {name:country,y:0};
            }
            }),function(country){ return  country.name;});
        });
        return app;
      });

    }


    _initialize();
  }

}());
