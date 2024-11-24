const API_KEY = process.env.API_KEY;
const USER_KEY = process.env.USER_KEY;

const alarmModel = require("../schemas/alarmSchema");

async function sendNotification(message) {
  let response = await fetch(
    `https://api.pushover.net/1/messages.json?token=${API_KEY}&user=${USER_KEY}&message=${message}`,
    {
      method: "POST",
    }
  );
  if (response.status != 200) {
    throw new Error("Failed to send message");
  }
  console.log(response);
  await alarmModel.create({
    time: new Date().toLocaleString(),
    message: message,
  });
}

async function repeatMessage(message) {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 5)); // 5 minutes
    if (alertActive) {
      sendNotification(message);
    }
    else {
      break;
    }
  }
}

module.exports = { sendNotification, repeatMessage };
