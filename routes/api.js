const router = require("express").Router();
const userRouter = require("./user");
const doctorRouter = require("./doctor");

router.use("/user", userRouter);
router.use("/doctor", doctorRouter);

module.exports = router;

