(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: AppInfo', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.appInfo'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('AppInfo', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
