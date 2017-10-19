angular.module('appMobStudio').factory('fornecedorData', [
    '$http', 
    '$location',
    FornecedorDataFactory 
])

function FornecedorDataFactory($http, $location) {
    const urlBase = 'api/fornecedores'
    const dataFactory = {}

    dataFactory.getFornecedores = () => {
        const page = parseInt($location.search().page) || 1
        const url = `${urlBase}?skip=${(page - 1) * 10}&limit=10`
        return $http.get(urlBase)
    }

    dataFactory.getFornecedor = (id) => {
        return $http.get(`${urlBase}/${fornecedor._id}`)
    }

    dataFactory.createFornecedor = (fornecedor) => {
        return $http.post(urlBase, fornecedor)
    }

    dataFactory.updateFornecedor = (fornecedor) => {
        return $http.put(`${urlBase}/${fornecedor._id}`, fornecedor)
    }

    dataFactory.deleteFornecedor = (fornecedor) => {
        return $http.delete(`${urlBase}/${fornecedor._id}`, fornecedor)
    }

    dataFactory.getCount = () => {
        return $http.get(`${urlBase}/count`)
    }
     return dataFactory
}