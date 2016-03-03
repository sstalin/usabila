(function () {
  'use strict';

  angular
    .module('usabila')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve: {
          feedbacks: function (feedback) {
            return feedback.get();
          }
        }
      })
      .state('main.dashboard', {
        url: '/dashboard',
        views: {
          'count@dashboard' : {
            template: 'app/components/dashboard/count.html'
          },
          'graph@dashboard' : {
            template: 'app/components/dashboard/graph.html'
          },
          'filters' : {
            template: 'app/components/dashboard/filters.html'
          },
          'table' : {
            template: 'app/components/dashboard/table.html'
          }
        }
      })
    ;

    $urlRouterProvider.otherwise('/dashboard');
  }

})();
