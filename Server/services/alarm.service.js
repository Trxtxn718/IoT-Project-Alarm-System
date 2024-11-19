const API_KEY = process.env.API_KEY;
const USER_KEY = process.env.USER_KEY;


export async function sendNotification(message) {
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
