const router = require("express").Router();

router.get("/", (req, res) => {
	res.redirect("http://localhost:8080/home");
});

router.get("/home", (req, res) => {
	res.render("home");
});

router.get("/crud/:path", (req, res) => {
	if (req.params.path != "") {
		// console.log(req.params.path);
		res.render("crud", { path: req.params.path });
	} else {
		res.render("404");
	}
});

router.get("/create/:path", (req, res) => {
	if (req.params.path != "") {
		// console.log(req.params.path);
		res.render("create", { path: req.params.path });
	} else {
		res.render("404");
	}
});

router.get("/read/:path", (req, res) => {
	if (req.params.path != "") {
		// console.log(req.params.path);
		res.render("read", { path: req.params.path });
	} else {
		res.render("404");
	}
});

router.get("/update/:path", (req, res) => {
	if (req.params.path != "") {
		// console.log(req.params.path);
		res.render("update", { path: req.params.path });
	} else {
		res.render("404");
	}
});

router.get("/delete/:path", (req, res) => {
	if (req.params.path != "") {
		// console.log(req.params.path);
		res.render("delete", { path: req.params.path });
	} else {
		res.render("404");
	}
});

module.exports = router;
