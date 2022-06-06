const router = require("express").Router();
const userRouter = require("./user");
const doctorRouter = require("./doctor");
const nurseRouter = require("./nurse");
const patientRouter = require("./patient");
const availableDatesRouter = require("./availableDates");
const appointmentsRouter = require("./appointment");
const permissionsRouter = require("./permissions");
const authRouter = require("./auth");

const isAuthenticated = require("../middleware/authenticate");
const isAuthorized = require("../middleware/authorize");


router.use("/", authRouter);

router.use("/", isAuthenticated);
router.use(isAuthorized);


router.use("/user", userRouter);
router.use("/doctor", doctorRouter);
router.use("/nurse", nurseRouter);
router.use("/patient", patientRouter);
router.use("/availableDates", availableDatesRouter);
router.use("/appointment", appointmentsRouter);
router.use("/permissions", permissionsRouter);

module.exports = router;
