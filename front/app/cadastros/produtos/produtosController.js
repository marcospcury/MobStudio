angular.module('appMobStudio').controller('produtosController', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  ProdutosController
])

function ProdutosController($scope,$http, $location, msgs, tabs, consts) {
  $scope.tipoMedidaList = [
    { value: 'Tridimensional', text: 'Tridimensional' },
    { value: 'Linear', text: 'Linear' },
  ]
  $scope.getProdutos = () => {
    const url = `api/produtos`
    $http.get(url).then(function(resp) {
      $scope.produtos = resp.data
      $scope.produto = {}
    })
    tabs.show($scope, {tabList: true, tabCreate: true})
  }

  $scope.showTabUpdate = (produto) => {
    $scope.produto = produto
    tabs.show($scope, {tabUpdate: true})
  }
  
  $scope.updateProduto = () => {
    const url = `api/produtos/${$scope.produto._id}`
    $http.put(url, $scope.produto).then((response) => {
      $scope.produto = {}
      $scope.getProdutos()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Produto atualizado com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.createProduto = () => {
    const url = `api/produtos`
    $http.post(url, $scope.produto).then((response) => {
      $scope.produto = {}
      $scope.getProdutos()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Produto incluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  $scope.showTabDelete = function(produto) {
    $scope.produto = produto
    tabs.show($scope, {tabDelete: true})
  }
  
  $scope.deleteProduto = () => {
    const url = `api/produtos/${$scope.produto._id}`
    $http.delete(url, $scope.produto).then((response) => {
      $scope.produto = {}
      $scope.getProdutos()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Produto excluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.cancel = () => {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.produto = {}
  }
  
  $scope.addEndereco = (index) => {
    $scope.produto.Enderecos.splice(index + 1, 0, {})
  }
  
  $scope.deleteEndereco = (index) => {
    $scope.produto.Enderecos.splice(index, 1)
  }


  $scope.getProdutos()  
  
}
