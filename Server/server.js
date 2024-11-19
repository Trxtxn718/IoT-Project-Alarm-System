"use strict";



require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");


const app = express();

const notificationRouter = require("./routers/notificationRouter");
const settingsModel = require('./schemas/settingsSchema');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  res.status(200).send("Hello World!");
});

app.use("/notifications", notificationRouter);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);