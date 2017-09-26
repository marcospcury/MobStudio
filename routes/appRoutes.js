'use strict';
module.exports = function(app) {
    var login = require('../controllers/loginController');

    app.route('/login')
        .get(login.get_login)
        .post(login.post_login);
        
    app.route('/').get(function(req, res){
        res.render('index', { title: 'Express' });
    });
};