(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: NewUsers', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.appMetrics'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('NewUsers', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
