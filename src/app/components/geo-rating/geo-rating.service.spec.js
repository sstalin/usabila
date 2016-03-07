(function() {
  'use strict';

  describe('service geoRating', function() {
    var geoRating;
    beforeEach(module('usabila'));
    beforeEach(inject(function(_geoRating_) {
        geoRating = _geoRating_;
    }));

    it('should be defined', function() {
      expect(geoRating).toEqual(jasmine.any(Object));
      expect(geoRating.getRatings).toEqual(jasmine.any(Function));
      expect(geoRating.groupByCountry).toEqual(jasmine.any(Function));
      expect(geoRating.iterator).toEqual(jasmine.any(Function));
    });

  });
})();

