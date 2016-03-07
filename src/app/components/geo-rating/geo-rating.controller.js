(function() {
  'use strict';

  angular
    .module('usabila')
    .controller('GeoRatingController', GeoRatingController);

  /* @ngInject */
  function GeoRatingController(feedbacks, geoRating) {
    var vm = this;
    vm.title = 'GeoRatingController';

    activate();

    ////////////////

    function activate() {
       vm.ratings = geoRating.getRatings(feedbacks);
    }
  }

})();


