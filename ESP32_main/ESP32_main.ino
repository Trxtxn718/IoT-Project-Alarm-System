// #define BUZZER_PIN 36
#define SENSOR_PIN 26

#define BAUD 9600

#define WIFI_SSID "MSI 2202"
#define WIFI_PASS "QS-D2023"
#define CONNECTION_TIMEOUT 10

#include <WiFi.h>

int cycle = 0;
int motion = 0;

void setup() {
  delay(1000);
  int timeout_counter = 0;

  // pinMode(BUZZER_PIN, OUTPUT);
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
  Serial.printf("\n");
}

void loop() {
  motion = digitalRead(SENSOR_PIN);
  Serial.printf("%d: %d\n", cycle, motion);
  cycle++;
  delay(1000);
}

void motionDetected() {
  Serial.println("Motion Detected");
}