USE MED_CENTER;
DROP TABLE HOME_ANALYSES;
DROP TABLE INSURANCES;
DROP TABLE WORKDAYS;
DROP TABLE ANALYSES;
DROP TABLE DESIASES;
DROP TABLE VISITIES;
DROP TABLE USERS;
DROP TABLE DOCTORS;

CREATE TABLE USERS(
					ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    FULLNAME NVARCHAR(50) NOT NULL,
                    GENDER CHAR(1) CHECK(GENDER = 'М' OR GENDER = 'Ж' OR GENDER = 'Н'),
                    BIRTHDATE DATE NOT NULL,
                    TELE_NUMBER VARCHAR(15),
                    EMAIL VARCHAR(100) NOT NULL UNIQUE,
                    LOGIN VARCHAR(30) NOT NULL UNIQUE,
                    PASSWORD VARCHAR(64) NOT NULL
                    );
CREATE TABLE HOME_ANALYSES(
							ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                            ID_USER INT NOT NULL,
                            PULSE VARCHAR(32) NULL,
                            TEMPERATURE VARCHAR(32) NULL,
                            BLOOD_PRESS VARCHAR(32) NULL,
                            DATE TIMESTAMP,
                            FOREIGN KEY (ID_USER) REFERENCES USERS(ID)
                            );
CREATE TABLE INSURANCES(
						ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        ID_USER INT NOT NULL,
                        NAME NVARCHAR(200) NOT NULL,
                        BEGIN DATE NOT NULL,
                        END DATE NOT NULL,
                        FOREIGN KEY (ID_USER) REFERENCES USERS(ID)
                        );
CREATE TABLE DOCTORS(
						ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        FULLNAME NVARCHAR(50) NOT NULL,
                        SPECIALITY NVARCHAR(50) NOT NULL,
                        EMAIL VARCHAR(100) NULL UNIQUE,
                        LOGIN VARCHAR(30) NOT NULL UNIQUE,
                        PASSWORD VARCHAR(30) NOT NULL,
                        EXPERIENCE TINYINT NOT NULL
                        );
CREATE TABLE WORKDAYS(
						ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        ID_DOC INT NOT NULL,
                        CABINET SMALLINT NOT NULL,
                        DAY DATE NOT NULL,
                        BEGIN TIME(0) NOT NULL,
                        END TIME(0) NOT NULL,
                        FOREIGN KEY (ID_DOC) REFERENCES DOCTORS(ID)
                        );
CREATE TABLE VISITIES(
						ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        ID_USER INT NOT NULL,
                        ID_DOC INT NOT NULL,
                        DATE_TIME DATETIME NOT NULL,
                        FOREIGN KEY (ID_USER) REFERENCES USERS(ID),
                        FOREIGN KEY (ID_DOC) REFERENCES DOCTORS(ID)
                        );
CREATE TABLE ANALYSES(
						ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        ID_VISITE INT NOT NULL,
                        LAB SMALLINT NOT NULL,
                        NAME NVARCHAR(50) NOT NULL,
                        RESULT NVARCHAR(100) NULL,
                        DATE_TIME DATETIME NOT NULL,
                        FOREIGN KEY (ID_VISITE) REFERENCES VISITIES(ID)
                        );
CREATE TABLE DESIASES(
						ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        ID_VISITE INT NOT NULL,
                        SYMPTOMES NVARCHAR(200) NOT NULL,
                        THERAPY NVARCHAR(200) NULL,
                        RESULT NVARCHAR(200) NULL,
                        FOREIGN KEY (ID_VISITE) REFERENCES VISITIES(ID)
                        );
