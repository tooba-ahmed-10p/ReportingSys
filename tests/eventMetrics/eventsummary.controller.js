(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: EventSummary', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.eventMetrics'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('EventSummary', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
