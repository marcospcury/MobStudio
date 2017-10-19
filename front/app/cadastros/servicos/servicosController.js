angular.module('appMobStudio').controller('servicosController', [
  '$scope',
  'servicoData',
  'categoriaData',
  'msgs',
  'tabs',
  'consts',
  ServicosController
])

function ServicosController($scope, servicoData, categoriaData, msgs, tabs, consts) {
  var getListaCategorias = () => {
    categoriaData.getCategoriasPorTipo("Serviço")
      .then((resp) => {
        $scope.CategoriaList = resp.data.map((categoria) => {
          return {
            text: categoria.Nome,
            value: categoria.Nome,
            SubCategoria: categoria.SubCategoria
          }
        })
        $scope.SubCategoriaList = []
      })
  }
  
  $scope.servico = { Categoria: "" }
  $scope.$watch(('servico.Categoria'), (categoria, old) => {
    if($scope.servico.Categoria) {
      const categoriaObj = $scope.CategoriaList.find((categoria) => {
        return categoria.text === $scope.servico.Categoria
      })
      $scope.SubCategoriaList = categoriaObj.SubCategoria.map((subCategoria) => {
        return {
          text: subCategoria.Nome,
          value: subCategoria.Nome
        }
      })
    }
  })

  $scope.getServicos = () => {
    servicoData.getServicos().then(function(resp) {
      getListaCategorias()
      $scope.servicos = resp.data
      $scope.servico = {}
      servicoData.getCount().then((resp) => {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.showTabUpdate = (servico) => {
    $scope.servico = servico
    tabs.show($scope, {tabUpdate: true})
  }
  
  $scope.updateServico = () => {
    servicoData.updateServico($scope.servico).then((response) => {
      $scope.servico = {}
      $scope.getServicos()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Serviço atualizado com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.createServico = () => {
    servicoData.createServico($scope.servico).then((response) => {
      $scope.servico = {}
      $scope.getServicos()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Serviço incluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }
  
  $scope.showTabDelete = function(servico) {
    $scope.servico = servico
    tabs.show($scope, {tabDelete: true})
  }
  
  $scope.deleteServico = () => {
    servicoData.deleteServico($scope.servico).then((response) => {
      $scope.servico = {}
      $scope.getServicos()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Serviço excluído com sucesso!')
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.cancel = () => {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.servico = {}
  }
  
  $scope.getServicos()  
}
