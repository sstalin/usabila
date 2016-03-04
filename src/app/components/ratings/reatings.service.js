(function() {
  'use strict';

  angular
    .module('usabila')
    .factory('ratings', ratings);

  /* @ngInject */
  function ratings() {
    var service = {
      count: count,
      get: get
    };
    return service;

    ////////////////

    function count(items) {
       return _.countBy(items, function(item){
            return item.rating;
       });
    }

    function get(items){
      var ratings = [];
      var descriptions = ['Very Bad', 'Bad', 'Average', 'Good', 'Amazing'];
      var count = service.count(items);
      var stub;

      for(var k in count){
        stub = {
          id: parseInt(k),
          description: descriptions[parseInt(k) - 1],
          count: count[k]
        };
        ratings.push(stub);
      }
      return ratings;
    }
  }

})();


