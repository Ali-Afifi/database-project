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

// user table

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

// doctor table

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


// nurse table


db.getAllNurses = () => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM nurse", (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getNurseById = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM nurse WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.createNurse = ({ user_id, manager_id }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"insert into nurse (user_id, manager_id) values(?, ?);",
			[user_id, manager_id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.updateNurse = (id, { manager_id }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"update nurse set manager_id=? where id=?;",
			[manager_id, id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.deleteNurse = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("DELETE FROM nurse WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};


// patient table

db.getAllPatients = () => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM patient", (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getPatientById = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM patient WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.createPatient = ({ user_id, doctor_id, nurse_id }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"insert into patient (user_id, doctor_id, nurse_id) values(?, ?, ?);",
			[user_id, doctor_id, nurse_id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.updatePatient = (id, { doctor_id, nurse_id }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"update patient set doctor_id=?, nurse_id=? where id=?;",
			[doctor_id, nurse_id, id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.deletePatient = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute("DELETE FROM patient WHERE id=?", [id], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};



module.exports = db;
