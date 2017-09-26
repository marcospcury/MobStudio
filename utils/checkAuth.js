module.exports = function(req, res, next) {
    if(!req.session || !req.session.authenticated){
        res.render('login');
    }
    next();
}