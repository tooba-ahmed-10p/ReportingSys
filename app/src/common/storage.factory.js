/**
 * @ngdoc service
 * @name app.common.storage
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.common')
    .factory('storage', storage);

  /* @ngInject */
  function storage() {
    var appConstants = {
      baseUrl:'http://api.flurry.com',
      apiAccessCode: 'RVG8N9RSQ2WWBF7X8XTK',
      applications: [
        {
          id:1,
          name: 'Monster Truck Racing - iOS',
          apiKey: 'P85HN2V448S8CG9S5YJR'
        },
        {
          id:2,
          name: '3D Motorcycle Racing Challenge - Android',
          apiKey: 'TKGJN7339NTTRZ92RB4T'
        },
        {
          id:4,
          name: 'Carumba - Android',
          apiKey: '16WTWALKBP1IFED29B22'
        }
      ]
    };

    var countries =[
      {
        name:'United States',
        code:'US'
      },
      {
        name:'Australia',
        code:'AU'
      },
      {
        name:'Canada',
        code:'CA'
      },
      {
        name:'China',
        code:'CN'
      },
      {
        name:'India',
        code:'IN'
      },
      {
        name: 'Malaysia',
        code: 'MY'
      },
      {
        name: 'Pakistan',
        code: 'PK'
      },
      {
        name: 'United Kingdom',
        code: 'GB'
      }
    ];

    /*var cookieExpiry= moment().add(1, 'days').toDate();
     $cookies.put(appConstants.apiAccessCode, 'RVG8N9RSQ2WWBF7X8XTK', cookieExpiry);*/

    return {
      appConstants: appConstants,
      countries:countries
    };

    ////////////////////

    /*function 	getApiAccessCode(){
     return $cookies.get(appConstants.apiAccessCode);
     }*/
  }

}());
