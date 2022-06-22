const router = require("express").Router();
const db = require("../db");
const utils = require("../utils");

router.get("/", async (req, res) => {
	try {
		let result = await db.getAllUsers();
		result = utils.cleanUserObj(result);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let result = await db.getUserById(req.params.id);
		result = utils.cleanUserObj(result);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/", async (req, res) => {
	try {
		let newUser = {
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
			password: utils.hashPassword(req.body.password),
			admin: parseInt(req.body.admin),
			gender: parseInt(req.body.gender),
			date_joined: new Date().toISOString().slice(0, 10),
		};
		let result = await db.createUser(newUser);

		if (newUser.admin == 1) {
			await db.createPermission(result.insertId, "/api/user", "GET");
			await db.createPermission(result.insertId, "/api/user/:id", "GET");
			await db.createPermission(result.insertId, "/api/user/:id", "PUT");
			await db.createPermission(
				result.insertId,
				"/api/user/:id",
				"DELETE"
			);
			await db.createPermission(result.insertId, "/api/user/", "POST");

			await db.createPermission(result.insertId, "/api/doctor", "GET");
			await db.createPermission(
				result.insertId,
				"/api/doctor/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/doctor/:id",
				"PUT"
			);
			await db.createPermission(
				result.insertId,
				"/api/doctor/:id",
				"DELETE"
			);
			await db.createPermission(result.insertId, "/api/doctor", "POST");

			await db.createPermission(result.insertId, "/api/nurse", "GET");
			await db.createPermission(result.insertId, "/api/nurse/:id", "GET");
			await db.createPermission(result.insertId, "/api/nurse/:id", "PUT");
			await db.createPermission(
				result.insertId,
				"/api/nurse/:id",
				"DELETE"
			);
			await db.createPermission(result.insertId, "/api/nurse", "POST");

			await db.createPermission(result.insertId, "/api/patient", "GET");
			await db.createPermission(
				result.insertId,
				"/api/patient/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/patient/:id",
				"PUT"
			);
			await db.createPermission(
				result.insertId,
				"/api/patient/:id",
				"DELETE"
			);
			await db.createPermission(result.insertId, "/api/patient", "POST");

			await db.createPermission(
				result.insertId,
				"/api/availableDates",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/availableDates/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/availableDates/:id",
				"PUT"
			);
			await db.createPermission(
				result.insertId,
				"/api/availableDates/:id",
				"DELETE"
			);
			await db.createPermission(
				result.insertId,
				"/api/availableDates/doctor/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/availableDates",
				"POST"
			);

			await db.createPermission(
				result.insertId,
				"/api/permissions",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/permissions/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/permissions/:id",
				"PUT"
			);
			await db.createPermission(
				result.insertId,
				"/api/permissions/:id",
				"DELETE"
			);
			await db.createPermission(
				result.insertId,
				"/api/permissions",
				"POST"
			);

			await db.createPermission(
				result.insertId,
				"/api/appointment",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment/doctor/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment/patient/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment/:id",
				"PUT"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment/:id",
				"DELETE"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment",
				"POST"
			);
		} else {
			await db.createPermission(
				result.insertId,
				"/api/availableDates",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/availableDates/doctor/:id",
				"GET"
			);

			await db.createPermission(
				result.insertId,
				"/api/appointment/patient/:id",
				"GET"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment",
				"POST"
			);
			await db.createPermission(
				result.insertId,
				"/api/appointment/:id",
				"PUT"
			);
		}

		res.json({ msg: "user added" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.put("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let newUser = {
			fname: req.body.fname,
			lname: req.body.lname,
			admin: parseInt(req.body.admin),
		};
		let result = await db.updateUser(req.params.id, newUser);
		res.json({ msg: "user updated" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let result = await db.deleteUser(req.params.id);
		res.json({ msg: "user deleted" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
