angular.module('appMobStudio').controller('categoriasController', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  CategoriasController
])

function CategoriasController($scope,$http, $location, msgs, tabs, consts) {
  $scope.tipoCategoriaList = [
    { value: "Produto", text: "Produto" },
    { value: "Serviço", text: "Serviço" }
  ]

  $scope.getCategorias = () => {
    const page = parseInt($location.search().page) || 1
    const url = `api/categorias?skip=${(page - 1) * 10}&limit=10`
    $http.get(url).then(function(resp) {
      $scope.categorias = resp.data
      $scope.categoria = {}
      initSubCategorias()
      $http.get(`api/categorias/count`).then((resp) => {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.showTabUpdate = (categoria) => {
    $scope.categoria = categoria
    initSubCategorias()
    tabs.show($scope, {tabUpdate: true})
  }
  
  $scope.updateCategoria = () => {
    const url = `api/categorias/${$scope.categoria._id}`
    $http.put(url, $scope.categoria).then((response) => {
      $scope.categoria = {}
      initSubCategorias()
      $scope.getCategorias()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('categoria atualizado com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.createCategoria = () => {
    const url = `api/Categorias`
    $http.post(url, $scope.categoria).then((response) => {
      $scope.categoria = {}
      initSubCategorias()
      $scope.getCategorias()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('categoria incluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  $scope.showTabDelete = function(categoria) {
    $scope.categoria = categoria
    tabs.show($scope, {tabDelete: true})
  }
  
  $scope.deleteCategoria = () => {
    const url = `api/Categorias/${$scope.categoria._id}`
    $http.delete(url, $scope.categoria).then((response) => {
      $scope.categoria = {}
      initSubCategorias()
      $scope.getCategorias()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('categoria excluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.cancel = () => {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.categoria = {}
    initSubCategorias()
  }
  
  $scope.addSubCategoria = (index) => {
    $scope.categoria.SubCategoria.splice(index + 1, 0, {})
  }
  
  $scope.deleteSubCategoria = (index) => {
    $scope.categoria.SubCategoria.splice(index, 1)
  }
  
  var initSubCategorias = () => {
    if(!$scope.categoria.SubCategoria || !$scope.categoria.SubCategoria.length) {
      $scope.categoria.SubCategoria = []
      $scope.categoria.SubCategoria.push({})
    }
  }

  $scope.getCategorias()  
  
}
