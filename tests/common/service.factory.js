(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: service', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var service;

    beforeEach(inject(function($injector){

      service = $injector.get('service');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
