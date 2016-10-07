(function (){

  'use strict';

  var mainMenu = [
    {
      'id': 'dashboard',
      'name': 'Dashboard',
      'icon': 'fa fa-home',
      'link': 'Header.Dashboard',
      'rights': 'public'
    },
    {
      'id': 'appMetrics',
      'name': 'AppMetrics',
      'icon': 'fa fa-area-chart',
      'link': 'Header.AppMetrics',
      'rights': 'public',
      'subMenu': [
        {
          'id': 'activeUsers',
          'name': 'Active Users',
          'link': 'Header.AppMetrics.ActiveUsers',
          'rights': 'public'
        },
        {
          'id': 'newUsersReport',
          'name': 'New Users',
          'link': 'Header.AppMetrics.NewUsers',
          'rights': 'public'
        },
        {
          'id': 'session',
          'name': 'Session',
          'link': 'Header.AppMetrics.Session',
          'rights': 'public'
        }
      ]
    },
    {
      'id': 'eventMetrics',
      'name': 'EventMetrics',
      'icon': 'fa fa-bar-chart',
      'link': 'Header.EventMetrics',
      'rights': 'public',
      'subMenu': [
        {
          'id': 'eventSummary',
          'name': 'Event Summary',
          'link': 'Header.EventMetrics.EventSummary',
          'rights': 'public'
        }
      ]
    },
    {
      'id': 'appInfo',
      'name': 'App Info',
      'icon': 'fa fa-info-circle',
      'link': 'Header.AppInfo',
      'rights': 'public'
    }
  ];

  angular
    .module('app.shell')
    .constant('mainMenu', mainMenu);

}());
