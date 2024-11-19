const express = require("express");
const router = express.Router();


let config = require("../config.json");
const alarmModel = require("../schemas/alarmSchema");

let alertActive = false;

router.get("/send", async (req, res) => {
  if (config.isActivated) {
    try {
    
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
  res.send("Notification is activated");
});

router.get("/deactivate", async (req, res) => {
  config.isActivated = false;
  res.send("Notification is deactivated");
});

router.get("/status", async (req, res) => {
  console.log("Heartbeat received from", req.ip);
  res.send(`Notification is ${config.isActivated ? "activated" : "deactivated"}`);
});

router.post("/motionDetected", async (req, res) => {
  if (config.isActivated) {
    try {
      let response = await fetch(
        `https://api.pushover.net/1/messages.json?token=${API_KEY}&user=${USER_KEY}&message=Motion detected!`,
        {
          method: "POST",
        }
      );
      if (response.status != 200) {
        throw new Error("Failed to send message");
      }
      alertActive = true;
      console.log(response);
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
