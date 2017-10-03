module.exports = {
    checkAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            req.flash('msg_erro', 'Não autorizado');
            res.redirect('/login');
        }
    }
}