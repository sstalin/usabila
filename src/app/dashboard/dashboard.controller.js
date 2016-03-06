/*global _ */
(function() {
  'use strict';

  angular
    .module('usabila')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(feedbacks, $log, device, ratings) {
    var vm = this;

    vm.items = feedbacks;
    vm.btnFilter = btnFilter;
    vm.device = device.byScreenSize;


    activate();

    ////////////////

    function activate() {
      vm.filterBtn = {
        one: {id: 1, matcher: {rating: 1}, value: true},
        two: {id: 2, matcher: {rating: 2}, value: true},
        three: {id: 3, matcher: {rating: 3}, value: true},
        four: {id: 4, matcher: {rating: 4}, value: true},
        five: {id: 5, matcher: {rating: 5}, value: true}
      };
      vm.feedbacks = feedbacks;
      vm.ratings = ratings.get(feedbacks);
      $log.debug('DashboardController ran');
    }

    function btnFilter(item) {
       var btn = _.find(vm.filterBtn, function(btn){
         return btn.matcher.rating === item.rating;
       });
       return btn.value;
    }
  }
})();
