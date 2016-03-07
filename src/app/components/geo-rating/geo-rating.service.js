/*global _ */
(function() {
  'use strict';

  angular
    .module('usabila')
    .factory('geoRating', geoRating);

  /* @ngInject */
  function geoRating() {
    var service = {
      getRatings: getRatings,
      groupByCountry: groupByCountry,
      iterator: iterator
    };
    return service;

    ////////////////

    function groupByCountry(feedbacks) {
      var byCountry = _.groupBy(feedbacks, function(next) {
        return next.geo.country;
      });
      var ratings = _.map(byCountry, iterator);
      return ratings;
    }

    function iterator(group){
      var total = 0;
      for(var k in group){
        total += parseInt(group[k].rating);
      }
      return {
        average: total / group.length,
        country: group[0].geo.country.toLowerCase(),
        count: group.length
      }
    }

    function getRatings(feedbacks) {
      return groupByCountry(feedbacks);
    }
  }

})();


