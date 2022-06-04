const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
	try {
		let result = await db.getAllPatients();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	try {
		let result = await db.getPatientById(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/", async (req, res) => {
	try {
		let newPatient = {
			user_id: parseInt(req.body.user_id),
			doctor_id:
				parseInt(req.body.doctor_id) === 0
					? null
					: parseInt(req.body.doctor_id),
			nurse_id:
				parseInt(req.body.nurse_id) === 0
					? null
					: parseInt(req.body.nurse_id),
		};
		let result = await db.createPatient(newPatient);
		res.json({ msg: "patient added" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.put("/:id", async (req, res) => {
	try {
		let newPatient = {
			doctor_id:
				parseInt(req.body.doctor_id) === 0
					? null
					: parseInt(req.body.doctor_id),
			nurse_id:
				parseInt(req.body.nurse_id) === 0
					? null
					: parseInt(req.body.nurse_id),
		};
		let result = await db.updatePatient(req.params.id, newPatient);
		res.json({ msg: "patient updated" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		let result = await db.deletePatient(req.params.id);
		res.json({ msg: "patient deleted" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
