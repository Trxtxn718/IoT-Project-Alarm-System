"use strict";



require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");


const app = express();

const notificationRouter = require("./routers/notificationRouter");


const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

await mongoose.connect("mongodb://localhost:27017/IoT-Alarm-System");

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/notifications", notificationRouter);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);