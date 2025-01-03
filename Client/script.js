async function toggleAlarm() {
  try {
    let alarmStatus
    alarmStatus = await fetch(window.location + "notifications/statusServer")
    alarmStatus = await alarmStatus.text()
    if (alarmStatus === "deactivated") {
      await fetch(window.location + "notifications/activate")
      alarmStatus = "activated"
    } else {
      await fetch(window.location + "notifications/deactivate")
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
    statusElement.innerText = "NICHT ERREICHBAR"
  }
  else if (alarmStatus === "deactivated") {
    statusElement.innerText = "AUS"
    statusElement.classList.add("off")
  } else {
    statusElement.innerText = "AN"
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
    fetch(window.location + "notifications/statusServer")
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
    fetch(window.location + "notifications/events")
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