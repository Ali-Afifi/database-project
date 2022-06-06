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

db.getUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM user WHERE email=?", [email], (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
}

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
		pool.execute(
			"SELECT * FROM patient WHERE id=?",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
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

// available_dates table

db.getAllAvDates = () => {
	return new Promise((resolve, reject) => {
		pool.execute("Select * FROM available_dates", (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getAvDateByID = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"Select * FROM available_dates WHERE id=?",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.getAvDateByDoctorID = (doctor_id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"Select * FROM available_dates WHERE doctor_id=?",
			[doctor_id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.createAvDate = ({ doctor_id, date, s_time, e_time }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"insert into available_dates (doctor_id, date, s_time, e_time) values(?, ?, ?, ?)",
			[doctor_id, date, s_time, e_time],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.updateAvDate = (id, { doctor_id, date, s_time, e_time }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"update available_dates set doctor_id=?, date=?, s_time=?, e_time=? where id=?;",
			[doctor_id, date, s_time, e_time, id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.deleteAvDate = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"DELETE FROM available_dates WHERE id=?",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

// appointment table

db.getAllAppointments = () => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM appointment;", (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getAppointmentByID = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"SELECT * FROM appointment where id=?;",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.getAppointmentByDoctorID = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"SELECT * FROM appointment where doctor_id=?;",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.getAppointmentByPatientID = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"SELECT * FROM appointment where patient_id=?;",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.createAppointment = ({ doctor_id, patient_id, date }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"insert into appointment (doctor_id, date, patient_id, state) values(?, ?, ?, 1)",
			[doctor_id, date, patient_id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.updateAppointment = (id, { doctor_id, patient_id, date, state }) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"update appointment set doctor_id=?, date=?, state=?, patient_id=? where id=?;",
			[doctor_id, date, state, patient_id, id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.deleteAppointment = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"DELETE FROM appointment WHERE id=?",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

// permissions table

db.getAllPermissions = () => {
	return new Promise((resolve, reject) => {
		pool.execute("SELECT * FROM permissions", (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result);
		});
	});
};

db.getPermissionsByID = (id) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"SELECT * FROM permissions where user_id=?",
			[id],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.createPermission = (id, route, method) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"INSERT INTO permissions (user_id, allowed_route, method) values (?, ?, ?)",
			[id, route, method],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

db.deletePermission = (id, route, method) => {
	return new Promise((resolve, reject) => {
		pool.execute(
			"DELETE FROM permissions WHERE (user_id=?) and (allowed_route=?) and (method=?);",
			[id, route, method],
			(err, result) => {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			}
		);
	});
};

module.exports = db;
