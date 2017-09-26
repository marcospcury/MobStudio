'use strict';

exports.get_login = function(req, res) {
    console.log('entrando na render login');
    res.render('login');
};

exports.post_login = function(req, res) {

};