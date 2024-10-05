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
    },
    member(req, res, next) {
        if (req.user&&req.user.is_member) next()
        else res.redirect('member')
    },
    admin(req, res, next) {
        if (req.user&&req.user.is_admin) next()
        else res.redirect('admin')
    }
}