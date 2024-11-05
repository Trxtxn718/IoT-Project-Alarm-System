const express = require("express");
const router = express.Router();

const API_KEY = process.env.API_KEY;
const USER_KEY = process.env.USER_KEY;
let config = require("./config.json");

router.get("/", async (req, res) => {
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

module.exports = router;