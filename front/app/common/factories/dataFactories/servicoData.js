angular.module('appMobStudio').factory('servicoData', [
    '$http', 
    '$location',
    ServicoDataFactory 
])

function ServicoDataFactory($http, $location) {
    const urlBase = 'api/servicos'
    const dataFactory = {}

    dataFactory.getServicos = () => {
        const page = parseInt($location.search().page) || 1
        const url = `${urlBase}?skip=${(page - 1) * 10}&limit=10`
        return $http.get(urlBase)
    }

    dataFactory.getServico = (id) => {
        return $http.get(`${urlBase}/${id}`)
    }

    dataFactory.createServico = (servico) => {
        return $http.post(urlBase, servico)
    }

    dataFactory.updateServico = (servico) => {
        return $http.put(`${urlBase}/${servico._id}`, servico)
    }

    dataFactory.deleteServico = (servico) => {
        return $http.delete(`${urlBase}/${servico._id}`, servico)
    }

    dataFactory.getCount = () => {
        return $http.get(`${urlBase}/count`)
    }
     return dataFactory
}