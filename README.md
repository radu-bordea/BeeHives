# BeeHives

Projektplan

Vi hade 2 gånger  veckomöten med kunden, där vi har diskuterat projektet utveckling och visade framstegen gällande  detta projekt.

Vi jobbar Agilt, har börjat utvecklat applikationen med hjälp av följande tekniker:

Frontend: 
HTML, CSS, BOOTSTRAP, JAVASCRIPT

Backend:
MYSQL, NODE.JS, REST API.

För alla dessa har vi dokumenterat oss  på Stack Overflow och olika tutorials på internet, samt Node.Js, Bootstrap officiella webbsidor.

Vidare tänker vi utveckla funktionalitet som gör kopplingen mellan frontend och backend, med hjälp av Node Rest Api Ends Points. 
Sedan skulle  vi skapa en open API som tar emot data från IOT och de kommer att sparas i database.

Graferna kommer att skapas på applikationens frontend med hjälp av en av följande Javascript  bibliotek D3.js, Charts.js, Plotly.

Budget: None

INSTRUCTIONS:

1. Clone the Github link: "git clone https://github.com/radu-bordea/BeeHives.git"
 
2. Database queries instructions which you find in the Read.me file:

CREATE SCHEMA beehive;

CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `types` (
  `typeID` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(45) NOT NULL,
  `unit` varchar(45) NOT NULL,
  `precission` varchar(45) NOT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `locations` (
  `locationID` int NOT NULL AUTO_INCREMENT,
  `lng` decimal(11,8) NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `locationName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`locationID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `keepers` (
  `keeperID` int NOT NULL AUTO_INCREMENT,
  `keeperName` varchar(45) NOT NULL,
  `contacts` varchar(45) NOT NULL,
  PRIMARY KEY (`keeperID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `devices` (
  `deviceID` int NOT NULL AUTO_INCREMENT,
  `locationID` int DEFAULT NULL,
  `keeperID` int DEFAULT NULL,
  `typeID` int DEFAULT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`deviceID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `measurements` (
  `measurementID` int NOT NULL AUTO_INCREMENT,
  `deviceID` int DEFAULT NULL,
  `value` decimal(10,8) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `registerTimestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`measurementID`),
  KEY `fk_deviceID` (`deviceID`,`measurementID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

3. Open the project in an IDE til example Visual Studio Code

4. Open a terminal and change directory to server folder "cd server"

5. Run "node app.js"
 
6 Open "index.html" in the Browser for example open with live server on Google Chrome

7. Try the application by register an user and login.

Thank you!
