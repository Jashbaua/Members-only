const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = {
	getMessages(req, res) {
		res.render("index",{logged:req.isAuthenticated()});
	},
	getSignUp(req, res) {
		res.render("signUpForm");
	},
	async postSignUp(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("signUpForm", {
				errors: errors.array(),
			});
		}
		bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
			await db.createUser(
				req.body.firstName,
				req.body.lastName,
				req.body.email,
				hashedPassword
			);
			res.redirect("/login");
		});
	},
	getLogin(req, res) {
		const errors = req.session.messages || [];
		req.session.messages = [];
		console.log(errors)
		res.render("loginForm",{errors});
	},
	getLogout(req, res) {
		req.logout((err) => {
			if (err) {
			  return next(err);
			}
			res.redirect("/");
		  });
	}
};
