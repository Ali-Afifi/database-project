const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
	try {
		let result = await db.getAllAppointments();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	try {
		let result = await db.getAppointmentByID(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/doctor/:id", async (req, res) => {
	try {
		let result = await db.getAppointmentByDoctorID(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/patient/:id", async (req, res) => {
	try {
		let result = await db.getAppointmentByPatientID(req.params.id);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/", async (req, res) => {
	try {
		let newAppointment = {
			doctor_id: parseInt(req.body.doctor_id),
			patient_id: parseInt(req.body.patient_id),
			date: req.body.date,
		};
		let result = await db.createAppointment(newAppointment);
		res.json({ msg: "appointment added" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.put("/:id", async (req, res) => {
	try {
		let newAppointment = {
			doctor_id: parseInt(req.body.doctor_id),
			patient_id: parseInt(req.body.patient_id),
			date: req.body.date,
            state: parseInt(req.body.state)
		};
		let result = await db.updateAppointment(req.params.id, newAppointment);
		res.json({ msg: "appointment updated" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		let result = await db.deleteAppointment(req.params.id);
		res.json({ msg: "appointment deleted" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
