angular.module('appMobStudio').factory('categoriaData', [
    '$http', 
    '$location',
    CategoriaDataFactory 
])

function CategoriaDataFactory($http, $location) {
    const urlBase = 'api/categorias'
    const dataFactory = {}

    dataFactory.getCategoriasPorTipo = (tipoCategoria) => {
        const url = `${urlBase}?Tipo=${tipoCategoria}`
        return $http.get(url)
    }

    dataFactory.getCategorias = () => {
        const page = parseInt($location.search().page) || 1
        const url = `${urlBase}?skip=${(page - 1) * 10}&limit=10`
        return $http.get(urlBase)
    }

    dataFactory.getCategoria = (id) => {
        return $http.get(`${urlBase}/${categoria._id}`)
    }

    dataFactory.createCategoria = (categoria) => {
        return $http.post(urlBase, categoria)
    }

    dataFactory.updateCategoria = (categoria) => {
        return $http.put(`${urlBase}/${categoria._id}`, categoria)
    }

    dataFactory.deleteCategoria = (categoria) => {
        return $http.delete(`${urlBase}/${categoria._id}`, categoria)
    }

    dataFactory.getCount = () => {
        return $http.get(`${urlBase}/count`)
    }
     return dataFactory
}