(function() {
  'use strict';

  angular
    .module('usabila')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(feedbacks, $log) {
     $log.debug('MainController ran');
  }
})();
