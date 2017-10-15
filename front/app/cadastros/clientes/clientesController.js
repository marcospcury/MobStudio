angular.module('appMobStudio').controller('clientesController', [
  '$scope',
  'clienteData',
  'msgs',
  'tabs',
  'consts',
  ClientesController
])

function ClientesController($scope, clienteData, msgs, tabs, consts) {
  $scope.getClientes = () => {
    clienteData.getClientes().then(function(resp) {
      $scope.clientes = resp.data
      $scope.cliente = {}
      initEnderecos()
      clienteData.getCount().then((resp) => {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.showTabUpdate = (cliente) => {
    $scope.cliente = cliente
    tabs.show($scope, {tabUpdate: true})
  }
  
  $scope.updateCliente = () => {
    clienteData.updateCliente($scope.cliente).then((response) => {
      $scope.cliente = {}
      initEnderecos()
      $scope.getClientes()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Cliente atualizado com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.createCliente = () => {
    clienteData.createCliente($scope.cliente).then((response) => {
      $scope.cliente = {}
      initEnderecos()
      $scope.getClientes()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Cliente incluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.showTabDelete = function(cliente) {
    $scope.cliente = cliente
    tabs.show($scope, {tabDelete: true})
  }
  
  $scope.deleteCliente = () => {
    clienteData.deleteCliente($scope.cliente).then((response) => {
      $scope.cliente = {}
      initEnderecos()
      $scope.getClientes()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Cliente excluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.cancel = () => {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.cliente = {}
    initEnderecos()
  }
  
  $scope.addEndereco = (index) => {
    $scope.cliente.Enderecos.splice(index + 1, 0, {})
  }
  
  $scope.deleteEndereco = (index) => {
    $scope.cliente.Enderecos.splice(index, 1)
  }
  
  var initEnderecos = () => {
    if(!$scope.cliente.Enderecos || !$scope.cliente.Enderecos.length) {
      $scope.cliente.Enderecos = []
      $scope.cliente.Enderecos.push({})
    }
  }
  $scope.getClientes()  
}
