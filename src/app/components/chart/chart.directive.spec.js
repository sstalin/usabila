(function() {
  'use strict';

  describe('directive chart', function() {
    var el;
    var scope;
    var ctrl;

    beforeEach(module('usabila'));
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.vm = {
        feedbacks: []
      };
      el = angular.element('<div chart chart-data="vm.feedbacks"></div>');

      $compile(el)(scope);
      scope.$digest();
      ctrl = el.controller;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should bind to controller ', function() {
      expect(ctrl).toEqual(jasmine.any(Function));
    });

    it('should have isolate scope object with chart data', function() {
      expect(el.isolateScope().data).toEqual(jasmine.any(Object));
    });

  });
})();
