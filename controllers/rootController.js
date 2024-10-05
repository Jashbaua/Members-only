const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = {
	async getIndex(req, res) {
		const messages = await db.getMessages();
		res.render("index", { messages, logged: req.isAuthenticated(), isMember:req.user&&req.user.is_member });
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
		console.log(errors);
		res.render("loginForm", { errors });
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
		res.render("messageForm");
	},
	async postMessageForm(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("messageForm", {
				errors: errors.array(),
			});
		}
		await db.createMessage(req.user.id, req.body.message);
		res.redirect("/");
	},
	getMember(req, res) {
		res.render("promotionTest");
	},
	async postMember(req, res) {
		if (req.body.promotionTest == 6) {
			await db.makeMember(req.user.id);
			res.send(`<script>
				alert('You are now a member!\\nNow you can see the names of authors');
				window.location.href = "/";
			  </script>`);
		} else {
			res.redirect('/member')
		}
	},
};
