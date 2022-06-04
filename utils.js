const crypto = require("crypto");

const cleanUserObj = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		arr[i].date_joined = arr[i].date_joined.toString();
		arr[i].admin = Boolean(Buffer.from(arr[i].admin).readInt8());
		arr[i].gender = Boolean(Buffer.from(arr[i].gender).readInt8())
			? "male"
			: "female";
	}

	return arr;
};

const hashPassword = (password) => {
	return crypto
		.pbkdf2Sync(password, process.env.PASSWORD_SALT, 42, 64, "sha512")
		.toString("hex");
};

module.exports = { cleanUserObj, hashPassword };
