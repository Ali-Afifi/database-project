const db = require("../db");

// req.jwt_token.email

// const getPermissions = async ()

const isAuthorized = (req, res, next) => {
	let req_route = req.originalUrl;	

	next();
};

module.exports = isAuthorized;
