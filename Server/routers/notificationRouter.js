const express = require("express");
const router = express.Router();


let config = require("../config.json");

const { sendNotification, repeatMessage } = require("../services/alarm.service");
const settingsModel = require("../schemas/settingsSchema");

let alertActive = false;

router.get("/send", async (req, res) => {
  const settings = await settingsModel.findOne();
  if (settings.isActivated) {
    try {
      sendNotification("Test message");
      res.send("Message send succesfully");
    } catch (error) {
      console.log("Error:", error);
      res.send("Error").status(400);
    }
  } else {
    res.send("Notification is not activated").status(400);
  }
});

router.get("/activate", async (req, res) => {
  config.isActivated = true;
  console.log("Notification is activated");
  res.send("Notification is activated");
});

router.get("/deactivate", async (req, res) => {
  config.isActivated = false;
  console.log("Notification is deactivated");
  res.send("Notification is deactivated");
});

router.get("/status", async (req, res) => {
  console.log("Heartbeat received from", req.ip , "at", new Date().toLocaleString());
  res.send(config.isActivated ? "activated" : "deactivated");
});

router.post("/motionDetected", async (req, res) => {
  const settings = await settingsModel.findOne();
  if (settings.isActivated) {
    try {
      sendNotification("Motion detected!");
      repeatMessage("Motion detected!");
      alertActive = true;
      res.send("Message sent succesfully");
    } catch (error) {
      console.log("Error:", error);
      res.send("Error").status(400);
    }
  } else {
    res.send("Notification is not activated").status(200);
  }
});


module.exports = router;
