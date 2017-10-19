angular.module('appMobStudio').controller('categoriasController', [
  '$scope',
  'categoriaData',
  'msgs',
  'tabs',
  'consts',
  CategoriasController
])

function CategoriasController($scope, categoriaData, msgs, tabs, consts) {
  $scope.tipoCategoriaList = [
    { value: "Produto", text: "Produto" },
    { value: "Serviço", text: "Serviço" }
  ]

  $scope.getCategorias = () => {
    categoriaData.getCategorias().then(function(resp) {
      $scope.categorias = resp.data
      $scope.categoria = {}
      initSubCategorias()
      categoriaData.GetCount().then((resp) => {
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
    categoriaData.updateCategoria($scope.categoria).then((response) => {
      $scope.categoria = {}
      initSubCategorias()
      $scope.getCategorias()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Categoria atualizada com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.createCategoria = () => {
    categoriaData.createCategoria($scope.categoria).then((response) => {
      $scope.categoria = {}
      initSubCategorias()
      $scope.getCategorias()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Categoria incluída com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  $scope.showTabDelete = function(categoria) {
    $scope.categoria = categoria
    tabs.show($scope, {tabDelete: true})
  }
  
  $scope.deleteCategoria = () => {
    categoriaData.deleteCategoria($scope.categoria).then((response) => {
      $scope.categoria = {}
      initSubCategorias()
      $scope.getCategorias()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Categoria excluída com sucesso!')
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
