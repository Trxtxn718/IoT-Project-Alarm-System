#define SENSOR_PIN 26

#define BUZZER_PIN 23
#define BUZZER_VALUE 125

#define BAUD 9600

#define WIFI_SSID "MSI 2202"
#define WIFI_PASS "QS-D2023"

// #define WIFI_SSID "Phone_1_8906"
// #define WIFI_PASS "12345678"
#define CONNECTION_TIMEOUT 10

#define SERVER_STATUS_ROUTE "http://192.168.137.1:3000/notifications/status"
#define SERVER_MOTION_DETECTED "http://192.168.137.1:3000/notifications/motionDetected"

#include <WiFi.h>
#include <HTTPClient.h>

int cycle = 0;
int motion = 0;
int activated = 0;
int alert = 0;

void setup() {
  delay(500);

  int timeout_counter = 0;

  pinMode(SENSOR_PIN, INPUT);
  attachInterrupt(SENSOR_PIN, motionDetected, RISING);

  Serial.begin(BAUD);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("Connecting to %s\n", WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
    timeout_counter++;
    if (timeout_counter >= CONNECTION_TIMEOUT * 5) {
      ESP.restart();
    }
  }
  Serial.printf("Connected! \n");
}

void loop() {
  motion = digitalRead(SENSOR_PIN);
  Serial.printf("%d: %d\n", cycle, motion);
  cycle++;

  // if (WiFi.status() == WL_CONNECTED) {
  //   WiFiClient client;
  //   HTTPClient http;

  //   http.begin(client, serverName);

  //   http.addHeader("Content-Type", "application/json");
  //   int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"value1\":\"24.25\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");
  // }

  String answer = httpGETRequest(SERVER_STATUS_ROUTE);
  Serial.println(answer);
  activated = answer.equals("activated");
  if (!activated) {
    alert = 0;
  }

  delay(1000);
}

String httpGETRequest(const char* serverName) {
  HTTPClient http;

  // Your IP address with path or Domain name with URL path
  http.begin(serverName);

  // If you need Node-RED/server authentication, insert user and password below
  //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");


  // Send HTTP POST request
  int httpResponseCode = http.GET();

  String payload = "{}";

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;
}

void motionDetected() {
  String answer = "";

  do {
    Serial.println("Motion Detected");
    answer = httpGETRequest(SERVER_MOTION_DETECTED);
    delay(100)
  } while (!answer.equals("Message sent succesfully") && !answer.equals("Notification is not activated"))

    if (answer.equals("Message sent succesfully")) {
    alert = 1
  }

  while (alert) {
    analogWrite(BUZZER_PIN, BUZZER_VALUE);
    delay(500);
    analogWrite(BUZZER_PIN, 0);
    delay(500);
  }
}