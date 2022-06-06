const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
	try {
		let result = await db.getAllDoctors();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let result = await db.getDoctorById(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/", async (req, res) => {
	try {
		let newDoctor = {
			user_id: parseInt(req.body.user_id),
			manager_id:
				parseInt(req.body.manager_id) === 0
					? null
					: parseInt(req.body.manager_id),
			speciality: parseInt(req.body.speciality),
		};
		let result = await db.createDoctor(newDoctor);
		res.json({ msg: "doctor added" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.put("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;


		let newDoctor = {
			manager_id:
				parseInt(req.body.manager_id) === 0
					? null
					: parseInt(req.body.manager_id),
			speciality: parseInt(req.body.speciality),
		};
		let result = await db.updateDoctor(req.params.id, newDoctor);
		res.json({ msg: "doctor updated" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;

		let result = await db.deleteDoctor(req.params.id);
		res.json({ msg: "doctor deleted" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
