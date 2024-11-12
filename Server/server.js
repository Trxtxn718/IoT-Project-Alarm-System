"use strict";



require('dotenv').config()
const express = require("express");

const app = express();

const notificationRouter = require("./routers/notificationRouter");


const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/notifications", notificationRouter);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);