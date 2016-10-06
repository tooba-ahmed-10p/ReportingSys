(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: ActiveUsers', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.appMetrics'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('ActiveUsers', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
