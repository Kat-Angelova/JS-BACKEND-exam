const { AUTH_COOKIE_NAME, TOKEN_SECRET } = require('../constants.js');
const jwt = require('../utils/jwt.js');

exports.authMiddleware = function(req, res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if(token) {

        jwt.verify(token, TOKEN_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                res.locals.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCookie(AUTH_COOKIE_NAME);
                res.status(401).render('404');
            });
    } else {
        next();
    }

};

exports.isAuthenticated = function(req, res, next) {
    if(req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }

};

exports.isGuest = function(req, res, next) {
    if(!req.user){
        next();
    } else{
        res.redirect('/');
    }
};