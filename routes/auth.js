const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const { hashPassword, cleanUserObj } = require("../utils");

router.post("/login", async (req, res) => {
	try {
		let user = cleanUserObj(await db.getUserByEmail(req.body.email))[0];

		if (hashPassword(req.body.password) === user.password) {
			let token = jwt.sign(
				{
					email: user.email,
					user_id: user.id,
				},

				process.env.JWT_SECRET,
				{ expiresIn: "3m" }
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

module.exports = router;
