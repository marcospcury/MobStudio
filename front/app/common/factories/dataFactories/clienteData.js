angular.module('appMobStudio').factory('clienteData', [
    '$http', 
    '$location',
    ClienteDataFactory 
])

function ClienteDataFactory($http, $location) {
    const urlBase = 'api/clientes'
    const dataFactory = {}

    dataFactory.getClientes = () => {
        const page = parseInt($location.search().page) || 1
        const url = `${urlBase}?skip=${(page - 1) * 10}&limit=10`
        return $http.get(urlBase)
    }

    dataFactory.getCliente = (id) => {
        return $http.get(`${urlBase}/${cliente._id}`)
    }

    dataFactory.createCliente = (cliente) => {
        return $http.post(urlBase, cliente)
    }

    dataFactory.updateCliente = (cliente) => {
        return $http.put(`${urlBase}/${cliente._id}`, cliente)
    }

    dataFactory.deleteCliente = (cliente) => {
        return $http.delete(`${urlBase}/${cliente._id}`, cliente)
    }

    dataFactory.getCount = () => {
        return $http.get(`${urlBase}/count`)
    }
     return dataFactory
}