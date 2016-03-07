(function() {
  'use strict';

  describe('GeoRatingController', function() {
    var ctrl, geoRating;

    beforeEach(module('usabila'));
    beforeEach(inject(function(_$controller_, _geoRating_) {
      geoRating = _geoRating_ ;
      spyOn(geoRating, 'getRatings').and.returnValue([]);
      ctrl = _$controller_('GeoRatingController', {feedbacks: [], geoRating: geoRating});
    }));

    it('should be defined', function() {
      expect(ctrl).toEqual(jasmine.any(Object));
    });

    it('should call geoRating.getRatings', function(){
       expect(geoRating.getRatings).toHaveBeenCalled();
    });

    it('should have ratings be defined', function() {
      expect(ctrl.ratings).toEqual(jasmine.any(Array));
    });

  });
})();
