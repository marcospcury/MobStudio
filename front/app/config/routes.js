angular.module('appMobStudio').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('cadastroClientes', {
      url: "/cadastros/clientes?Page",
      templateUrl: "cadastros/clientes/tabs.html"
    }).state('cadastroProdutos', {
      url: "/cadastro/produtos?Page",
      templateUrl: "cadastros/produtos/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
}])
