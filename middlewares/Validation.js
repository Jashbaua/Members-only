const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

module.exports = {
	validateSignUp: [
		body("firstName")
			.trim()
			.isAlpha()
			.withMessage(`First name ${alphaErr}`)
			.isLength({ min: 1, max: 10 })
			.withMessage(`First name ${lengthErr}`),
		body("lastName")
			.trim()
			.isAlpha()
			.withMessage(`Last name ${alphaErr}`)
			.isLength({ min: 1, max: 10 })
			.withMessage(`Last name ${lengthErr}`),
		body("email")
			.trim()
			.isEmail()
			.withMessage("Email must be valid")
			.normalizeEmail(),
		body("password")
			.trim()
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters long"),
		body("confirmPassword")
			.trim()
			.custom((value, { req }) => {
				return value === req.body.password;
			})
			.withMessage("Passwords do not match"),
	],
	validateMessage: [
		body("message")
			.trim()
			.notEmpty()
			.withMessage("Message is required")
			.isLength({ min: 5, max: 500 })
			.withMessage("Message must be between 5 and 500 characters")
			.escape(),
	],
};
