(function () {
  'use strict';

  angular
    .module('usabila')
    .factory('feedback', feedback);

  /* @ngInject */
  function feedback($http, $q) {
    var service = {
      get: get
    };
    return service;

    ////////////////

    function get() {
      var defered = $q.defer();
      $http.get('http://cache.usabilla.com/example/apidemo.json').then(function (response) {
        if (response.status == 200) {
          defered.resolve(response.data.items);
        } else {
          defered.reject('failure');
        }
      });
      return defered.promise;
    }
  }

})();

