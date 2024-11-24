async function toggleAlarm() {
  try {
    let alarmStatus
    alarmStatus = await fetch("http://127.0.0.1:3000" + "/notifications/status")
    alarmStatus = await alarmStatus.text()
    if (alarmStatus === "deactivated") {
      await fetch("http://127.0.0.1:3000" + "/notifications/activate")
      alarmStatus = "activated"
    } else {
      await fetch("http://127.0.0.1:3000" + "/notifications/deactivate")
      alarmStatus = "deactivated"
    }
    updateElement(alarmStatus)
  } catch (error) {
    console.error("Error:", error)
    upadateElement("UNREACHABLE")
  }
}

function updateElement(alarmStatus) {
  let statusElement = document.getElementById("alarm-status")

  if (alarmStatus === "UNREACHABLE") {
    statusElement.classList.add("off")
    statusElement.innerText = "NOT REACHABLE"
  }
  else if (alarmStatus === "deactivated") {
    statusElement.innerText = "Off"
    statusElement.classList.add("off")
  } else {
    statusElement.innerText = "On"
    statusElement.classList.remove("off")
  }
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    fetch("http://127.0.0.1:3000" + "/notifications/status")
      .then(response => response.text())
      .then(alarmStatus => {
        updateElement(alarmStatus)
      })
  }
  catch (error) {
    console.error("Error:", error)
    updateElement("UNREACHABLE")
  }
});