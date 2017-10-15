angular.module('appMobStudio').controller('clientesController', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  ClientesController
])

function ClientesController($scope,$http, $location, msgs, tabs, consts) {
  $scope.getClientes = () => {
    const page = parseInt($location.search().page) || 1
    const url = `api/clientes?skip=${(page - 1) * 10}&limit=10`
    $http.get(url).then(function(resp) {
      $scope.clientes = resp.data
      $scope.cliente = {}
      initEnderecos()
      $http.get(`api/clientes/count`).then((resp) => {
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
    const url = `api/clientes/${$scope.cliente._id}`
    $http.put(url, $scope.cliente).then((response) => {
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
    const url = `api/clientes`
    $http.post(url, $scope.cliente).then((response) => {
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
    const url = `api/clientes/${$scope.cliente._id}`
    $http.delete(url, $scope.cliente).then((response) => {
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
