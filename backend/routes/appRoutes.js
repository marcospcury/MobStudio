const {checkAuth} = require('../utils/checkAuth')

module.exports = (app) => {
    const login = require('../controllers/loginController')
    const upload = require('../controllers/uploadController')

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
}