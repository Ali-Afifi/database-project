const router = require("express").Router();
const userRouter = require("./user");
const doctorRouter = require("./doctor");
const nurseRouter = require("./nurse");
const patientRouter = require("./patient");

router.use("/user", userRouter);
router.use("/doctor", doctorRouter);
router.use("/nurse", nurseRouter);
router.use("/patient", patientRouter);

module.exports = router;
