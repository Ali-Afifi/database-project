const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
});

let db = {};

db.getAllUsers = () => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM user", (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getUserById = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM user WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.createUser = ({
	fname,
	lname,
	email,
	password,
	admin,
	gender,
	date_joined,
}) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"insert into user (fname, lname, email, password, admin, gender, date_joined) values (?, ?, ?, ?, ?, ?, ?);",
			[fname, lname, email, password, admin, gender, date_joined],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.updateUser = (id, { fname, lname, admin }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"update user set fname=?, lname=?, admin=? where id=?;",
			[fname, lname, admin, id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.deleteUser = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("DELETE FROM user WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getAllDoctors = () => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM doctor", (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getDoctorById = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM doctor WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.createDoctor = ({ user_id, speciality, manager_id }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"insert into doctor (user_id, speciality, manager_id) values(?, ?, ?);",
			[user_id, speciality, manager_id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.updateDoctor = (id, { speciality, manager_id }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"update doctor set speciality=?, manager_id=? where id=?;",
			[speciality, manager_id, id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.deleteDoctor = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("DELETE FROM doctor WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

module.exports = db;
