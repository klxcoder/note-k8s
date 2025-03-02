const database = require("./database");

const express = require("express");
const app = express();

// Middlewares
const cors = require('cors');
const morgan = require("morgan");
app.use(cors());
app.use(morgan("common"));

app.get("/", async (req, res, next) => {
  try {
    const [rows] = await database.raw('SELECT VERSION() AS version');
    const version = rows[0].version;
    res.json({ message: `Hello from MySQL ${version}` });
  } catch (error) {
    next(error);
  }
});

app.get("/healthz", function (req, res) {
  res.send("I am happy and healthy\n");
});

module.exports = app;
