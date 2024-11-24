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

function addEventToList(eventType, eventTime) {
  const li = document.createElement("li")
  const h3 = document.createElement("h3")
  const div = document.createElement("div")

  h3.innerText = eventType
  div.innerText = eventTime

  li.appendChild(h3)
  li.appendChild(div)

  document.getElementById("events-list").appendChild(li)
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

  try {
    fetch("http://127.0.0.1:3000" + "/notifications/events")
      .then(response => response.json())
      .then(events => {
        events.forEach(event => {
          addEventToList("Alarm", event.time)
        })
      })
  }
  catch (error) {
    console.error("Error:", error)
  }
});