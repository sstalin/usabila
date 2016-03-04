(function() {
  'use strict';

  angular
    .module('usabila')
    .factory('device', device);

  /* @ngInject */
  function device() {
    var service = {
      byScreenSize: byScreenSize
    };
    return service;

    ////////////////

    function byScreenSize(screen) {
      if(screen.availWidth <= 400){
        return 'Mobile';
      }
      if(screen.availWidth > 400 && screen.availWidth < 1000){
        return 'Tablet';
      }
      return 'Desktop';
    }
  }

})();


