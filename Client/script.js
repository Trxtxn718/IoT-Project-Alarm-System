async function toggleAlarm() {
  try {
    let alarmStatus
    alarmStatus = await fetch("http://127.0.0.1:3000" + "/notifications/status")
    alarmStatus = await alarmStatus.text()
    console.log("Alarm status:", alarmStatus)
    updateElement(alarmStatus)
  } catch (error) {
    console.error("Error:", error)
    upadateElement("UNREACHABLE")
  }
}

function updateElement(alarmStatus) {
  let statusElement = document.getElementById("alarm-status")

  console.log("Alarm status CAHNGER:", alarmStatus)
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
  }
});