const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1989",
  database: "beehive",
});

// Connect

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

const app = express();
app.use(cors());
app.use(express.json());

// create DB

app.get("/api/measurements", (req, res) => {
  let sql = `SELECT m.deviceID, d.typeID, t.typeName, m.value, m.timestamp FROM beehive.measurements as m
JOIN beehive.devices as d
ON d.deviceID = m.deviceID
JOIN beehive.types as t
on t.typeID = d.typeID 
ORDER BY deviceID`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/devices", (req, res) => {
  let sql = "SELECT * from devices";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/types", (req, res) => {
  let sql = "SELECT * from types";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen("5000", () => {
  console.log("Server started on port 5000");
});

// POST keeper
app.post("/api/keepers", async (req, res) => {
  const { keeperName, contacts } = req.body;
  db.query(
    "INSERT INTO beehive.keepers (keeperName, contacts) VALUES(?, ?)",
    [keeperName, contacts],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});

app.post("/api/types", async (req, res) => {
  const { typeName, unit, precission } = req.body;
  db.query(
    "INSERT INTO beehive.types (typeName, unit, precission) VALUES(?, ?, ?)",
    [typeName, unit, precission],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});

app.post("/api/locations", async (req, res) => {
  const { lng, lat, locationName } = req.body;
  db.query(
    "INSERT INTO beehive.locations (lng, lat, locationName) VALUES(?, ?, ?)",
    [lng, lat, locationName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});

app.post("/api/devices", async (req, res) => {
  const { locationID, keeperID, typeID, address } = req.body;
  db.query(
    "INSERT INTO beehive.devices (locationID, keeperID, typeID, address) VALUES(?, ?, ?, ?)",
    [locationID, keeperID, typeID, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});


app.post("/api/users", async (req, res) => {
  const { userName, email, password } = req.body;
  db.query(
    "INSERT INTO beehive.users (userName, email, password) VALUES (?, ?, ?)",
    [userName, email, password],
    (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send("USER CREATED");
      }
    }
  )

})

app.get("/api/users", (req, res) => {
  let sql = "SELECT * from users";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

