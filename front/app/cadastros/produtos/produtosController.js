angular.module('appMobStudio').controller('produtosController', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  'FileUploader',
  ProdutosController
])

function ProdutosController($scope,$http, $location, msgs, tabs, consts, FileUploader) {
  var uploader = $scope.uploader = new FileUploader({
    url: '/files/upload/produto_foto'
  })

  var addFotoProduto = (fileInfo) => {
    if(!$scope.produto.Fotos) {
      $scope.produto.Fotos = []
    }
    $scope.produto.Fotos.push(fileInfo)
    let url = `api/produtos/${$scope.produto._id}`
    $http.put(url, $scope.produto).then((response) => { 
      loadGalleryPics()
      msgs.addSuccess('Foto incluída no produto!')
    })
  }

  uploader.onSuccessItem = (fileItem, response, status, headers) => {
    let fileInfo = {
      NomeArquivo: fileItem._file.name,
      ETag: response.ETag.replace('\"', '').replace('\"', '')
    }
    addFotoProduto(fileInfo)
  }

  $scope.deleteImg = (img, cb) => {
    const index = img.id
    $http.delete(`files/delete_one/produto_foto/${$scope.produto.Fotos[index].NomeArquivo}`).then((response) => {
      $scope.produto.Fotos.splice(index, 1)
      let url = `api/produtos/${$scope.produto._id}`
      $http.put(url, $scope.produto).then((response) => { 
        msgs.addSuccess('Foto excluída do produto!')
        loadGalleryPics()
        cb()
      }).catch((resp) => {
        msgs.addError(resp.data.errors)
      })
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }

  uploader.filters.push({
    name: 'customFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
    }
  })

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
    loadGalleryPics()
    tabs.show($scope, {tabUpdate: true})
  }
  
  const loadGalleryPics = () => {
    $scope.images = $scope.produto.Fotos.map((foto, index) => {
      return {
        id: index,
        title: '',
        url: `${consts.awsUrl}/produto_foto/${foto.NomeArquivo}`,
        thumbUrl: `${consts.awsUrl}/produto_foto/${foto.NomeArquivo}`,
        deletable: true
      }
    })
  }

  $scope.updateProduto = () => {
    const url = `api/produtos/${$scope.produto._id}`
    $http.put(url, $scope.produto).then((response) => {
      $scope.produto = {}
      $scope.getProdutos()
      tabs.show($scope, {tabList: true, tabCreate: true})
      uploader.clearQueue()
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

  $scope.showTabDelete = (produto) => {
    $scope.produto = produto
    tabs.show($scope, {tabDelete: true})
  }
  
  $scope.deleteProduto = () => {
    $http.post('files/delete_multiple/produto_foto', $scope.produto.Fotos).then((response) => {
      const url = `api/produtos/${$scope.produto._id}`
      $http.delete(url, $scope.produto).then((response) => {
        $scope.produto = {}
        $scope.images = []
        $scope.getProdutos()
        tabs.show($scope, {tabList: true, tabCreate: true})
        msgs.addSuccess('Produto excluído com sucesso!')
      }).catch((resp) => {
        msgs.addError(resp.data.errors)
      })
    }).catch((resp) => {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.cancel = () => {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.produto = {}
    uploader.clearQueue()
  }

  $scope.getProdutos()  
}
