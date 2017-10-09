'use strict'
const {checkAuth} = require('../utils/checkAuth')

module.exports = (app) => {
    var login = require('../controllers/loginController')

    app.route('/login')
        .get(login.get_login)
        .post(login.post_login)
        
    app.route('/registro')
        .get(login.get_registro)
        .post(login.post_registro)
        
    app.route('/').get((req, res) => {
        res.render('index')
    })
}