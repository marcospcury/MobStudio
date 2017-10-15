angular.module('appMobStudio').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('cadastroClientes', {
      url: "/cadastros/clientes?page",
      templateUrl: "cadastros/clientes/tabs.html"
    }).state('cadastroProdutos', {
      url: "/cadastros/produtos?page",
      templateUrl: "cadastros/produtos/tabs.html"
    }).state('cadastroFornecedores', {
      url: "/cadastros/fornecedores?page",
      templateUrl: "cadastros/fornecedores/tabs.html"
    }).state('cadastroCategorias', {
      url: "/cadastros/categorias?page",
      templateUrl: "cadastros/categorias/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
}])
