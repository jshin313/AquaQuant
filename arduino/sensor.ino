int sensor = 0; // Analog in
int val = 0; // Current reading for analog pin

// Without any vibrations, the sensor consistently outputs 4 or 5
int MIDPOINT1 = 4;
int MIDPOINT2 = 5;

// Debouncing code from https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce
// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 2000;    // the debounce time; increase if the output flickers

void setup() {
  Serial.begin(9600);
}

void loop() {
  val = analogRead(sensor);
  //Serial.println(val);
  
  if ((abs(val - MIDPOINT2) > 2 || abs(val - MIDPOINT1) > 2) && lastDebounceTime == 0)
  {
    lastDebounceTime = millis();
    Serial.println("On");
  }
  else if (abs(val - MIDPOINT2) > 2 || abs(val - MIDPOINT1) > 2)
  {
    lastDebounceTime = millis();
  }
  else if (lastDebounceTime != 0 && (millis() - lastDebounceTime) > debounceDelay) {
    lastDebounceTime = 0;
    Serial.println("Off");
  }

}
