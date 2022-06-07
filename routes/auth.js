const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const { hashPassword, cleanUserObj } = require("../utils");

router.post("/login", async (req, res) => {
	try {
		let user = (await db.getUserByEmail(req.body.email))[0];

		// console.log(user);

		if (hashPassword(req.body.password) === user.password) {
			let token = jwt.sign(
				{
					email: user.email,
					user_id: user.id,
				},

				process.env.JWT_SECRET,
				{ expiresIn: "1d" }
			);

			res.status(200).json(token);
		} else {
			res.status(404).send({
				message: "Wrong credentials",
			});
		}
	} catch (err) {
		res.status(404).send({
			message: "Wrong credentials",
		});
	}
});

router.post("/signup", async (req, res) => {
	try {
		let newUser = req.body;
		newUser.admin = 0;
		newUser.gender = parseInt(newUser.gender);
		newUser.date_joined = new Date().toISOString().slice(0, 10);
		newUser.password = hashPassword(newUser.password);

		// console.log(newUser);

		let created = await db.createUser(newUser);
		let id = (await db.getUserByEmail(newUser.email))[0]["id"];

		// console.log(id);

		await db.createPatient({
			user_id: id,
			doctor_id: null,
			nurse_id: null,
		});

		res.status(200).redirect("http://localhost:8080/login");
	} catch (err) {
		console.log(err.sqlMessage);
		res.status(404).send({
			message: "the email you've entered is already taken",
		});
	}
});

module.exports = router;
