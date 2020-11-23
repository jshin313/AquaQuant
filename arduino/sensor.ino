#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

int sensor = 0; // Analog in
int val = 0; // Current reading for analog pin

// Without any vibrations, the sensor consistently outputs 5 or 6
int MIDPOINT1 = 4;
int MIDPOINT2 = 4;

// Debouncing code from https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce
// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 2000;    // the debounce time; increase if the output flickers

void setup() {
  Serial.begin(115200);  //Serial connection
  WiFi.begin("Shin Wifi", "jna3131014");   //WiFi connection; wifi stuff taken from https://techtutorialsx.com/2017/01/08/esp8266-posting-json-data-to-a-flask-server-on-the-cloud/
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion

    delay(500);
    Serial.println("Waiting for connection");

  }

}

void loop() {


  val = analogRead(sensor);
  //Serial.println(val);

  if ((abs(val - MIDPOINT2) > 1 || abs(val - MIDPOINT1) > 1) && lastDebounceTime == 0)
  {
    lastDebounceTime = millis();
    Serial.println("On");

    HTTPClient http;

    // Send request
    http.begin("http://aquaquant.herokuapp.com/api/on");
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST("{\"water_source\":\"faucet\",\"on\":\"True\"}");

    // Read response
    Serial.print(http.getString());

    // Disconnect
    http.end();



  }
  else if (abs(val - MIDPOINT2) > 1 || abs(val - MIDPOINT1) > 1)
  {
    lastDebounceTime = millis();
  }
  else if (lastDebounceTime != 0 && (millis() - lastDebounceTime) > debounceDelay) {
    lastDebounceTime = 0;
    Serial.println("Off");
    HTTPClient http;

    // Send request
    http.begin("http://aquaquant.herokuapp.com/api/on");
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST("{\"water_source\":\"faucet\",\"on\":\"False\"}");

    // Read response
    Serial.print(http.getString());

    // Disconnect
    http.end();


  }




}
