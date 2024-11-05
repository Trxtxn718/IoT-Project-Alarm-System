"use strict";

let config = require("./config.json");

require('dotenv').config()
const express = require("express");

const app = express();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;
const USER_KEY = process.env.USER_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/sendNotification", async (req, res) => {
  try {
    let response = await fetch(
      `https://api.pushover.net/1/messages.json?token=${API_KEY}&user=${USER_KEY}&message=Hello world from server again!`,
      {
        method: "POST",
      }
    );
    console.log(response)
    res.send("Message send succesfully");
  } catch (error) {
    console.log("Error:", error);
    res.send("Error").status(400);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);