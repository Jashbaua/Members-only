const passport = require('../config/passport')

module.exports = {
    
    login: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: '/login',
        failureMessage:true
    }),
    user(req, res, next) {
        if (req.isAuthenticated()) next()
        else res.redirect('login')
    }
}