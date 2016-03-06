(function() {
  'use strict';

  describe('DashboardController', function(){
    var ctrl, ratings;

    beforeEach(module('usabila'));
    beforeEach(inject(function(_$controller_) {
      ratings = {
        get: angular.noop
      };
      spyOn(ratings, 'get');
      ctrl = _$controller_('DashboardController', {feedbacks: [], ratings: ratings});
    }));

    it('should instantiate locals', function(){
      expect(ctrl).toEqual(jasmine.any(Object));
      expect(ctrl.feedbacks).toEqual(jasmine.any(Array));
      expect(ctrl.filterBtn).toEqual(jasmine.any(Object))
    });

    it('should call ratings', function(){
      expect(ratings.get).toHaveBeenCalled();
    });

  });
})();
