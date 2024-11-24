async function toggleAlarm() {
  let statusElement = document.getElementById("alarm-status")
  let alarmStatus

  try {
    alarmStatus = await fetch("http://192.168.137.1:3000" + "/notifications/status")
    console.log("Alarm status:", alarmStatus)
  } catch (error) {
    console.error("Error:", error)
    statusElement.classList.add("off")
    statusElement.innerText = "NOT REACHABLE"
  }



  if (alarmStatus === "activated") {
    statusElement.innerText = "Off"
    statusElement.classList.add("off")
  } else {
    statusElement.innerText = "On"
    statusElement.classList.remove("off")
  }
}