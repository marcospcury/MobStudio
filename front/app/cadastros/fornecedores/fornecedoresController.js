angular.module('appMobStudio').controller('fornecedoresController', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  FornecedoresController
])

function FornecedoresController($scope,$http, $location, msgs, tabs, consts) {
 
  $scope.getProdutos = () => {
    $http.get('api/produtos').then(function(resp) {
      $scope.produtoList = resp.data
    })
  }
  
  $scope.getFornecedores = () => {
    const page = parseInt($location.search().page) || 1
    const url = `api/fornecedores?skip=${(page - 1) * 10}&limit=10`
    $http.get(url).then(function(resp) {
      $scope.fornecedores = resp.data
      $scope.fornecedor = {}
      $scope.getProdutos()
      initEnderecos()
      initProdutos()
      $http.get(`api/fornecedores/count`).then((resp) => {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.showTabUpdate = (fornecedor) => {
    $scope.fornecedor = fornecedor
    tabs.show($scope, {tabUpdate: true})
  }

  $scope.carregarNomeProduto = (idProduto) => {
    let produto = $scope.produtoList.filter((produto) => {
      return produto._id === idProduto
    })
    return produto[0].Nome
  }
  
  $scope.updateFornecedor = () => {
    const url = `api/fornecedores/${$scope.fornecedor._id}`
    $http.put(url, $scope.fornecedor).then((response) => {
      $scope.fornecedor = {}
      initEnderecos()
      initProdutos()
      $scope.getFornecedores()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Fornecedor atualizado com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.createFornecedor = () => {
    const url = `api/fornecedores`
    $http.post(url, $scope.fornecedor).then((response) => {
      $scope.fornecedor = {}
      initEnderecos()
      initProdutos()
      $scope.getFornecedores()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Fornecedor incluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  $scope.showTabDelete = function(cliente) {
    $scope.fornecedor = cliente
    tabs.show($scope, {tabDelete: true})
  }
  
  $scope.deleteFornecedor = () => {
    const url = `api/fornecedores/${$scope.fornecedor._id}`
    $http.delete(url, $scope.fornecedor).then((response) => {
      $scope.fornecedor = {}
      initEnderecos()
      initProdutos()
      $scope.getFornecedores()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Fornecedor excluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.cancel = () => {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.fornecedor = {}
    initEnderecos()
    initProdutos()
  }
  
  $scope.addEndereco = (index) => {
    $scope.fornecedor.Enderecos.splice(index + 1, 0, {})
  }
  
  $scope.deleteEndereco = (index) => {
    $scope.fornecedor.Enderecos.splice(index, 1)
  }

  $scope.addProduto = () => {
    $scope.fornecedor.Produtos.push({ 
      Produto: $scope.produtoInclusao.Produto.originalObject._id,  
      CodigoFornecedor: $scope.produtoInclusao.CodigoFornecedor,
      Valor: $scope.produtoInclusao.Valor
    })
    $scope.produtoInclusao = {}
  }
  
  $scope.deleteProduto = (index) => {
    $scope.fornecedor.Produtos.splice(index, 1)
  }
  
  var initEnderecos = () => {
    if(!$scope.fornecedor.Enderecos || !$scope.fornecedor.Enderecos.length) {
      $scope.fornecedor.Enderecos = []
      $scope.fornecedor.Enderecos.push({})
    }
  }

  var initProdutos = () => {
    $scope.produtoInclusao = {}
    if(!$scope.fornecedor.Produtos || !$scope.fornecedor.Produtos.length) {
      $scope.fornecedor.Produtos = []
    }
  }

  $scope.getFornecedores()  
  
}
