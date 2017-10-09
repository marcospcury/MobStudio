angular.module('appMobStudio').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('cadastroClientes', {
      url: "/cadastros/clientes",
      templateUrl: "cadastros/clientes/tabs.html"
    }).state('billingCycle', {
      url: "/billingCycles?page",
      templateUrl: "billingCycle/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
}])
