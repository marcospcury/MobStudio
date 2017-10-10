const {checkAuth} = require('../utils/checkAuth')

module.exports = (app) => {
    const login = require('../controllers/loginController')
    const upload = require('../controllers/uploadController')
    const deleteFile = require('../controllers/deleteFileController')

    app.route('/login')
        .get(login.get_login)
        .post(login.post_login)
        
    app.route('/registro')
        .get(login.get_registro)
        .post(login.post_registro)
        
    app.route('/').get((req, res) => {
        res.render('index')
    })

    app.route('/upload')
        .post(upload.post)

    app.route('/produtos/fotos')
        .post(deleteFile.delete_multiple)

    app.route('/produtos/fotos/:etag')
        .delete(deleteFile.delete_one)
}