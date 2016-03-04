(function() {
  'use strict';

  angular
    .module('usabila')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
          },
          'count@dashboard': {
            templateUrl: 'app/components/rating-table/rating-table.html'
          },
          'graph@dashboard': {
            templateUrl: 'app/components/graph/graph.html'
          },
          'filters@dashboard': {
            templateUrl: 'app/components/filters/filters.html'
          },
          'table@dashboard': {
            templateUrl: 'app/components/feedback-table/feedback-table.html'
          }
        },
        resolve: {
          feedbacks: function(feedback) {
            return feedback.get();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
