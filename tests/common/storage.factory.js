(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: storage', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var storage;

    beforeEach(inject(function($injector){

      storage = $injector.get('storage');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
