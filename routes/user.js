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
