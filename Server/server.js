"use strict";

require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const localhost = express();

const notificationRouter = require("./routers/notificationRouter");
const settingsModel = require('./schemas/settingsSchema');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

localhost.use(express.urlencoded({ extended: true }));
localhost.use(express.json());

localhost.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

mongoose.connect("mongodb://localhost:27017/IoT-Alarm-System").then(() => {
  console.log("Connected to the database");
  settingsModel.findOneAndUpdate({
    isActivated: true,
    userKey: process.env.USER_KEY
  });
}).catch((error) => {
  console.log("Error:", error);
});

app.get("/", (req, res) => {
  sendHTML(req, res);
});

app.get("/style.css", (req, res) => {
  sendCSS(req, res);
});

app.get("/script.js", (req, res) => {
  sendJS(req, res);
});

app.get("/favicon.ico", (req, res) => {
  sendFavicon(req, res);
});

app.use("/notifications", notificationRouter);

localhost.get("/", (req, res) => {
  sendHTML(req, res);
});

localhost.get("/style.css", (req, res) => {
  sendCSS(req, res);
});

localhost.get("/script.js", (req, res) => {
  sendJS(req, res);
});

localhost.get("/favicon.ico", (req, res) => {
  sendFavicon(req, res);
});

localhost.use("/notifications", notificationRouter);

app.listen(PORT, HOST);
console.log(`App running on http://${HOST}:${PORT}`);

localhost.listen(3000, "127.0.0.1");
console.log(`Localhost running on http://127.0.0.1:3000`);


function sendHTML(req, res) {
  res.sendFile(path.join(__dirname, "../Client/index.html"));
}

function sendCSS(req, res) {
  res.sendFile(path.join(__dirname, "../Client/style.css"));
}

function sendJS(req, res) {
  res.sendFile(path.join(__dirname, "../Client/script.js"));
}

function sendFavicon(req, res) {
  res.sendFile(path.join(__dirname, "../Client/favicon.ico"));
}