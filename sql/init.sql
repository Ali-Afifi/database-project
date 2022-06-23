CREATE DATABASE clinicdb;
use clinicdb;
CREATE TABLE `user` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `fname` varchar(255) NOT NULL,
    `lname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `admin` bit(1) NOT NULL,
    `gender` bit(1) NOT NULL,
    `date_joined` date NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `doctor` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int unsigned NOT NULL,
    `speciality` enum(
        'gynecology',
        'obstetrics',
        'gynecology and obstetrics'
    ) NOT NULL,
    `manager_id` int unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_id` (`user_id`),
    KEY `manager_id` (`manager_id`),
    CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `nurse` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int unsigned NOT NULL,
    `manager_id` int unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_id` (`user_id`),
    KEY `manager_id` (`manager_id`),
    CONSTRAINT `nurse_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `nurse_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `patient` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int unsigned NOT NULL,
    `doctor_id` int unsigned DEFAULT NULL,
    `nurse_id` int unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_id` (`user_id`),
    KEY `doctor_id` (`doctor_id`),
    KEY `patient_relation_3` (`nurse_id`),
    CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`),
    CONSTRAINT `patient_relation_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `patient_relation_3` FOREIGN KEY (`nurse_id`) REFERENCES `nurse` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `permissions` (
    `user_id` int unsigned NOT NULL,
    `allowed_route` varchar(255) NOT NULL,
    `method` varchar(255) NOT NULL,
    KEY `user_id` (`user_id`),
    CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `available_dates` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `doctor_id` int unsigned NOT NULL,
    `date` date NOT NULL,
    `s_time` time NOT NULL,
    `e_time` time NOT NULL,
    PRIMARY KEY (`id`),
    KEY `doctor_id` (`doctor_id`),
    CONSTRAINT `available_dates_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `appointment` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `doctor_id` int unsigned NOT NULL,
    `patient_id` int unsigned NOT NULL,
    `date` datetime NOT NULL,
    `state` enum(
        'wait',
        'confirmed',
        'postponed',
        'cancelled',
        'done'
    ) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `doctor_id` (`doctor_id`),
    KEY `patient_id` (`patient_id`),
    CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`),
    CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;