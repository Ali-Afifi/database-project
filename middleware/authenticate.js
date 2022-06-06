require("dotenv").config();

const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
	const header = req.header("Authorization");
	if (!header) {
		return res
			.status(401)
			.send({ message: "Access denied. No token provided." });
	}

	const token = header.split(" ")[1];

	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch {
		return res.status(403).send({ message: "Invalid auth credentials." });
	}
	if (
		!decoded.hasOwnProperty("email") ||
		!decoded.hasOwnProperty("user_id")
	) {
		return res.status(403).send({ message: "Invalid auth credentials." });
	}
	const { exp } = decoded;


	if (Date.now() >= exp * 1000) {
		return res.status(403).send({ message: "Token expired." });
	}

    req.jwt_token = jwt.verify(token, process.env.JWT_SECRET);

	next();
};

module.exports = isAuthenticated;
