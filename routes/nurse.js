const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
	try {
		let result = await db.getAllNurses();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let result = await db.getNurseById(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/", async (req, res) => {
	try {
		let newNurse = {
			user_id: parseInt(req.body.user_id),
			manager_id:
				parseInt(req.body.manager_id) === 0
					? null
					: parseInt(req.body.manager_id),
		};
		let result = await db.createNurse(newNurse);
		res.json({ msg: "nurse added" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.put("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let newNurse = {
			manager_id:
				parseInt(req.body.manager_id) === 0
					? null
					: parseInt(req.body.manager_id),
		};
		let result = await db.updateNurse(req.params.id, newNurse);
		res.json({ msg: "nurse updated" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let result = await db.deleteNurse(req.params.id);
		res.json({ msg: "nurse deleted" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
