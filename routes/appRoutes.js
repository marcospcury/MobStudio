'use strict';
const {checkAuth} = require('../utils/checkAuth');

module.exports = function(app) {
    var login = require('../controllers/loginController');

    app.route('/login')
        .get(login.get_login)
        .post(login.post_login);
        
    app.route('/registro')
        .get(login.get_registro)
        .post(login.post_registro);
        
    app.route('/').get(checkAuth, (req, res) => {
        res.render('index');
    });

    app.route('/cadastro/clientes').get(checkAuth, (req, res) => {
        res.render('cadastro/clientes');
    });
};