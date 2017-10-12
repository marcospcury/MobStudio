const {checkAuth} = require('../utils/checkAuth')

module.exports = (app) => {
    const login = require('../controllers/loginController')
    const file = require('../controllers/fileController')
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

    app.route('/files/upload/:origem')
        .post(file.upload)

    app.route('/files/delete_multiple/:origem')
        .post(file.delete_multiple)

    app.route('/files/delete_one/:origem/:nome_arquivo')
        .delete(file.delete_one)
}