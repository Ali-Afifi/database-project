const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
	try {
		let result = await db.getAllPermissions();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	try {
		let result = await db.getPermissionsByID(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/:id", async (req, res) => {
	try {

		let result = await db.createPermission(req.params.id, req.body.allowed_route, req.body.method);
		res.json({ msg: "permission added" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		let result = await db.deletePermission(req.params.id, req.body.allowed_route, req.body.method);
		res.json({ msg: "permission deleted" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
