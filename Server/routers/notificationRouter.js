const express = require("express");
const router = express.Router();


let config = require("../config.json");
const alarmModel = require("../schemas/alarmSchema");

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


module.exports = router;
