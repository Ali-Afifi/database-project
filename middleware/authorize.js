const db = require("../db");

const isAuthorized = async (req, res, next) => {
	let req_route = req.originalUrl;
	let req_method = req.method;
	let token = req.jwt_token;

	let allowed = false;

	let permissions = await db.getPermissionsByID(token.user_id);

	// console.log(token.user_id, req_route, req_method);
	// console.log(permissions);

	for (let i = 0; i < permissions.length; i++) {
		let hasParam =
			permissions[i]["allowed_route"].split(":")[0] +
				req_route.split("/")[req_route.split("/").length - 1] ===
			req_route;
		if (
			(permissions[i]["allowed_route"] === req_route &&
				permissions[i]["method"] === req_method) ||
			(hasParam && permissions[i]["method"] === req_method)
		) {
			allowed = true;
			break;
		}
	}

	if (!allowed) {
		return res.status(401).send({
			message: "You don't have the permission to do that.",
		});
	}

	next();
};

module.exports = isAuthorized;
