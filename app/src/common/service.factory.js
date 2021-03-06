/**
 * @ngdoc service
 * @name app.common.service
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.common')
    .factory('service', service);

  /* @ngInject */
  function service(storage, $http, $q, $timeout) {
    return {
      ActiveUsers: {
        daily: function (params) {
          return storage.appConstants.baseUrl + '/appMetrics/ActiveUsers?apiAccessCode=' + storage.appConstants.apiAccessCode + '&apiKey=' + params.apiKey + '&startDate=' + params.startDate + '&endDate=' + params.endDate;
        },
        byWeek: function (params) {
          return storage.appConstants.baseUrl + '/appMetrics/ActiveUsersByWeek?apiAccessCode=' + storage.appConstants.apiAccessCode + '&apiKey=' + params.apiKey + '&startDate=' + params.startDate + '&endDate=' + params.endDate;
        },
        byMonth: function (params) {
          return storage.appConstants.baseUrl + '/appMetrics/ActiveUsersByMonth?apiAccessCode=' + storage.appConstants.apiAccessCode + '&apiKey=' + params.apiKey + '&startDate=' + params.startDate + '&endDate=' + params.endDate;
        }
      },
      NewUsers:{
        getAllUsers: function (params){
          return storage.appConstants.baseUrl + '/appMetrics/NewUsers?apiAccessCode=' + storage.appConstants.apiAccessCode + '&apiKey=' + params.apiKey + '&startDate=' + params.startDate + '&endDate=' + params.endDate + '&country=ALL';
        }
      },
      Session:{
        sessionLength:function(apiKey,startDate,endDate){
          return storage.appConstants.baseUrl + '/appMetrics/AvgSessionLength?apiAccessCode=' + storage.appConstants.apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + startDate + '&endDate=' + endDate;
        }
      },
      EventMetrics: {
        summary: function (params) {
          return storage.appConstants.baseUrl + '/eventMetrics/Summary?apiAccessCode=' + storage.appConstants.apiAccessCode + '&apiKey=' + params.apiKey + '&startDate=' + params.startDate + '&endDate=' + params.endDate;
        }
      },
      AppInfo: {
        get: function (params) {
          return storage.appConstants.baseUrl + '/appInfo/getAllApplications?apiAccessCode=' + storage.appConstants.apiAccessCode + '&apiKey=' + params.apiKey;
        }
      },
      httpCall: httpCall,
      asyncCall: asyncCall
    };

    function httpCall(url) {
      return $http.get(url);
    }

    function asyncCall(url, index) {
      var deferred = $q.defer();
      $timeout(function () {
        httpCall(url).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
      }, 2000 * index);
      return deferred.promise;
    }

  }

}());
