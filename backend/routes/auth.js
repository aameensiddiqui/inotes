const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRETKEY = "hellomoto";
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1:
// create a User using POST: /api/auth/createuser. No login required
router.post(
	"/createuser",
	[
		body("name", "Name must be minimun 3 characters long").isLength({ min: 3 }),
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password must be at least 5 char long").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			//if there are errors send a bad request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			//if a user with same email exists already send a bad request
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(400)
					.json({ errors: "User with this email already exists." });
			}
			// adding salt to the password to make it secure
			// with the help of a one way function from bcryptjs (hash)
			// which changes the original password to a crypted one
			const salt = await bcrypt.genSalt(10);
			const securedPass = await bcrypt.hash(req.body.password, salt);
			//create new user
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: securedPass,
			});
			// create an authentication key with user id and secret key
			const data = { user: { id: user.id } };
			const authtoken = jwt.sign(data, JWT_SECRETKEY);
			// send the information. can send user, makes no sense, so send auth key
			//// res.json(user);
			res.json({ authtoken });
		} catch (e) {
			console.error(e.message);
			res.status(500).send("Some error ocurred.");
		}
	}
);

// ROUTE 2:
// Authenticate a User using POST: /api/auth/login. No login required
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password must not be blank").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// checking email
		// using destructuring method of javascript
		const { email, password } = req.body;
		try {
			//	find the user in the db with the entered email of the client
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					error:
						"No such email found. Please try login again with the correct credentials.",
				});
			}
			// 	checking password
			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				return res.status(400).json({
					error:
						"Wrong password. Please try login again with the correct credentials.",
				});
			}
			//	if both credentials are correct, send the payload
			const data = { user: { id: user.id } };
			const authtoken = jwt.sign(data, JWT_SECRETKEY);
			res.json({ authtoken });
		} catch (e) {
			console.error(e.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 3:
// get user information. Login required.
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		// get the id
		const userID = req.user.id;
		//  by id, get the userinfo minus the password
		const user = await User.findById(userID).select("-password");
		// send the user
		res.send(user);
	} catch (e) {
		res.status(500).send({ error: "Internal server error" });
	}
});
module.exports = router;
