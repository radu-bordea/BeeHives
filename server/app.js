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

app.get("/api/temp", (req, res) => {
  let sql = "SELECT * from measurements";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});



app.listen("5000", () => {
  console.log("Server started on port 5000");
});
