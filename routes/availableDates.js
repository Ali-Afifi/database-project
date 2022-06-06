const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
	try {
		let result = await db.getAllAvDates();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;


		let result = await db.getAvDateByID(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/doctor/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;


		let result = await db.getAvDateByDoctorID(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/", async (req, res) => {
	try {
		let newDate = {
			doctor_id: parseInt(req.body.doctor_id),
			date: req.body.date,
			s_time: req.body.s_time,
			e_time: req.body.e_time,
		};
		let result = await db.createAvDate(newDate);
		res.json({ msg: "date added" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.put("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;


		let newDate = {
			doctor_id: parseInt(req.body.doctor_id),
			date: req.body.date,
			s_time: req.body.s_time,
			e_time: req.body.e_time,
		};
		let result = await db.updateAvDate(req.params.id, newDate);
		res.json({ msg: "date updated" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		if (req.params.id === "") throw err;


		let result = await db.deleteAvDate(req.params.id);
		res.json({ msg: "date deleted" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
