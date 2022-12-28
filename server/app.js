const express = require("express");
const mysql = require("mysql");
const cors = require('cors');


// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1989",
  database: 'beehive'
});

// Connect

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

const app = express();
app.use(cors())
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
