angular.module('appMobStudio').factory('produtoData', [
    '$http', 
    '$location',
    ProdutoDataFactory 
])

function ProdutoDataFactory($http, $location) {
    const urlBase = 'api/produtos'
    const dataFactory = {}

    dataFactory.getProdutos = () => {
        const page = parseInt($location.search().page) || 1
        const url = `${urlBase}?skip=${(page - 1) * 10}&limit=10`
        return $http.get(urlBase)
    }

    dataFactory.getProduto = (id) => {
        return $http.get(`${urlBase}/${produto._id}`)
    }

    dataFactory.createProduto = (produto) => {
        return $http.post(urlBase, produto)
    }

    dataFactory.updateProduto = (produto) => {
        return $http.put(`${urlBase}/${produto._id}`, produto)
    }

    dataFactory.deleteProduto = (produto) => {
        return $http.delete(`${urlBase}/${produto._id}`, produto)
    }

    dataFactory.getCount = () => {
        return $http.get(`${urlBase}/count`)
    }
     return dataFactory
}