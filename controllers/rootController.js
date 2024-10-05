const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = {
	async getIndex(req, res) {
		const messages= await db.getMessages()
		res.render("index",{messages,logged:req.isAuthenticated()});
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
	},
	getMessageForm(req, res) {
		res.render('messageForm')
	},
	async postMessageForm(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("messageForm", {
				errors: errors.array(),
			});
		}
		await db.createMessage(req.user.id, req.body.message)
		res.redirect('/')
	}
};
