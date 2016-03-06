(function() {
  'use strict';

  describe('service feedback', function() {
    var $httpBackend, feedback;

    beforeEach(module('usabila'));
    beforeEach(inject(function(_$httpBackend_, _feedback_) {
      $httpBackend = _$httpBackend_;
      feedback = _feedback_;
    }));

    it('should be registered', function() {
      expect(feedback).not.toEqual(null);
    });

    describe('get function', function() {
      beforeEach(function(){
        $httpBackend.when('GET', 'http://cache.usabilla.com/example/apidemo.json').respond(200, {items: []});
      });

      it('should exist', function() {
        expect(feedback.get).not.toEqual(null);
      });

      it('should return data', function(){
        var data;
          feedback.get().then(function(fetchedData){
             data = fetchedData;
          });
         $httpBackend.flush();
         expect(data).toEqual(jasmine.any(Array));
      });
    });
  });
})();
