angular.module('appMobStudio').controller('fornecedoresController', [
  '$scope',
  'fornecedorData',
  'msgs',
  'tabs',
  'consts',
  FornecedoresController
])

function FornecedoresController($scope, fornecedorData, msgs, tabs, consts) {
 
  $scope.getFornecedores = () => {
    fornecedorData.getFornecedores().then(function(resp) {
      $scope.fornecedores = resp.data
      $scope.fornecedor = {}
      initEnderecos()
      fornecedorData.getCount().then((resp) => {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.showTabUpdate = (fornecedor) => {
    $scope.fornecedor = fornecedor
    tabs.show($scope, {tabUpdate: true})
  }

  $scope.updateFornecedor = () => {
    fornecedorData.updateFornecedor($scope.fornecedor).then((response) => {
      $scope.fornecedor = {}
      initEnderecos()
      $scope.getFornecedores()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Fornecedor atualizado com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.createFornecedor = () => {
    fornecedorData.createFornecedor($scope.fornecedor).then((response) => {
      $scope.fornecedor = {}
      initEnderecos()
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
    fornecedorData.deleteFornecedor($scope.fornecedor).then((response) => {
      $scope.fornecedor = {}
      initEnderecos()
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
  }
  
  $scope.addEndereco = (index) => {
    $scope.fornecedor.Enderecos.splice(index + 1, 0, {})
  }
  
  $scope.deleteEndereco = (index) => {
    $scope.fornecedor.Enderecos.splice(index, 1)
  }

  var initEnderecos = () => {
    if(!$scope.fornecedor.Enderecos || !$scope.fornecedor.Enderecos.length) {
      $scope.fornecedor.Enderecos = []
      $scope.fornecedor.Enderecos.push({})
    }
  }

  $scope.getFornecedores()  
}