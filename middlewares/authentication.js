const passport = require('../config/passport')

module.exports = {
    
    user: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: '/login',
        failureMessage:true
    })

}