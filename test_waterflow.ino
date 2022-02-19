// reading liquid flow rate using Seeeduino and Water Flow Sensor from Seeedstudio.com

// Code adapted by Charles Gantt from PC Fan RPM code written by Crenn @thebestcasescenario.com

// http:/themakersworkbench.com http://thebestcasescenario.com http://seeedstudio.com
#include <stdio.h>
#include <cmath>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <EEPROM.h>
#include "ESP8266TrueRandom.h"

//byte for uuid
byte uuidNumber[16]; // UUIDs in binary form are 16 bytes long
char uid[37];
char idNum[37];

bool check_id = false; //Check id to send through MQTT

const char* ssid = "Bannruksa";
const char* pass = "BEE52538";
const char* mqtt_server = "broker.mqttdashboard.com";
volatile int NbTopsFan; //measuring the rising edges of the signal
volatile int NbTopsFan2;
char id[50];

int Calc;
int Calc2;
//Delay to send data
int delayTime = 1;

float Calc_sec;
float total = 0;
float units = 0;
float Calc_sec2;
float total2 = 0;
float units2 = 0;

//Struct For EEPROM
struct backupData {
  float b_total;
  float b_water;
} backupData;
float b_total = 0;
float b_water = 0;
//bool check_id = false;

int hallsensor = 4;   //The pin location of the sensor
int hallsensor2 = 5;

//uuid
//MQTT Initiate
WiFiClient espClient;
PubSubClient client(espClient);
char outTopic[] = "watervalue/1"; //waterTopic
char outTopic2[] = "hwid/1"; //hardware id topic

//FOR UUID IN EEPROM
int address = 0;

String EEPROM_read(int index, int length) {
  String text = "";
  char ch = 1;

  for (int i = index; (i < (index + length)) && ch; ++i) {
    if (ch = EEPROM.read(i)) {
      text.concat(ch);
    }
  }
  return text;
}

int EEPROM_write(int index, String text) {
  for (int i = index; i < text.length() + index; ++i) {
    EEPROM.write(i, text[i - index]);
  }
  EEPROM.write(index + text.length(), 0);
  EEPROM.commit();

  return text.length() + 1;
}

//  Connect to MQTT
void reconnect() {
  // Loop until we're reconnected
  if (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    char clientID[15];
    String("iot-" + String(random(1000000))).toCharArray(clientID, 15);
    //Random Client ID
    if (client.connect(clientID))
    {
      Serial.println("Successfully connected with MQTT");
      Serial.print("Client: ");
      Serial.println(clientID);
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds"); // Wait 5 seconds before retrying delay(1000);
    }
  }
}

void rpm () {
  //This is the function that the interupt calls
  NbTopsFan++; //This function measures the rising and falling edge of the hall effect sensors signal
}

void rpm2 () {
  //This is the function that the interupt calls
  NbTopsFan2++; //This function measures the rising and falling edge of the hall effect sensors signal
}

void setup() {
  //Set up EEPROM
  EEPROM.begin(512);
  Serial.begin(9600);
  EEPROM.get(38, backupData);

  //Generate Hardware ID
  //hardwareId += String(random(0xffff), HEX);
  //hardwareId.toCharArray(id, 50);

  //Connect WiFi
  Serial.begin(9600); //
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting...  ");
    Serial.printf("Connection Status: %d\n", WiFi.status());
    delay(1000);
  }
  Serial.print("Wi-Fi connected.");
  Serial.print("IP Address : ");
  Serial.println(WiFi.localIP());

  //Connect HiveMQ
  client.setServer(mqtt_server, 1883);


  //Set up Waterflow Sensor
  pinMode(hallsensor, INPUT); //initializes digital pin 2 as an input
  Serial.begin(9600); //This is the setup function where the serial port is initialised,
  attachInterrupt(hallsensor, rpm, RISING); //and the interrupt is attached

  //Gen UUID to EEPROM
  delay(3000);
  if (EEPROM_read(0, 37).length() == 0) {
    ESP8266TrueRandom.uuid(uuidNumber);
    String uuidNum = ESP8266TrueRandom.uuidToString(uuidNumber);
    int len = EEPROM_write(address, uuidNum);

  }
  EEPROM_read(0, 37).toCharArray(uid, 37);
}

void loop () {
  //Connect MQTT
  if (!client.connected())
  {
    reconnect();
  }

  //Chceck Connection Status
  //Serial.printf("Connection Status: %d\n", WiFi.status());
  //Serial.println(WiFi.localIP());

  //Check send ID **CHANGE check_id to number**  USE LATER***************************************************************************
  if (check_id != true) {
    //send hardware id to server
    EEPROM_read(0, 37).toCharArray(idNum, 37);
    client.publish(outTopic2, idNum);
    check_id = true;
    EEPROM.write(38, check_id);
    Serial.println(idNum);
  }


  //Run water count
  waterCount();

  //Show Result

  Serial.print("Seneor1\n");
  Serial.print (Calc, DEC); //Prints the number calculated above
  Serial.print (" L/hour\r\n"); //Prints "L/hour" and returns a new line

  Serial.print (Calc_sec, hallsensor); //Prints the number calculated above
  Serial.print (" L/sec\r\n");

  Serial.print ("Total Water: ");
  Serial.print (total); //Prints the number calculated above
  Serial.print (" Units\r\n");
  backupData.b_water = total;

  //Check total unit use
  //every 1000 total unit = 1 irl unit
  Serial.print("Total useage = ");
  Serial.print(floor(total / 1000));
  Serial.print("\n");
  backupData.b_total = floor(total / 1000);

  //Send data to HiveMQ
  if (delayTime == 5) {
    char outPayload[1000] = "";
    sprintf(outPayload, "{\"id\": \"%s\" ,\"total_usage\" : %d.%02d}" , uid, (int)total, (int)(total * 100) % 100);
    Serial.print(outPayload);
    Serial.print("\n");
    //if condition no id = gen , have id = send watervalue
    client.publish(outTopic, outPayload);
    delayTime = 0;
  }

  //Test EEPROM
  /*Serial.print(backupData.b_total);
    Serial.print("\n");
    Serial.print(backupData.b_water);
    Serial.print("\n");
    backupData.b_total += 1;
    backupData.b_water += 1;
    Serial.print(backupData.b_total);
    Serial.print("\n");
    Serial.print(backupData.b_water);
    Serial.print("\n");
    Serial.print(backupData.uuidNum);
    Serial.print("\n");
    Serial.print(backupData.check_id);
    Serial.print("\n");*/
  EEPROM.put(39, backupData);
  EEPROM.commit();
  delayTime++;
  client.loop();


}
//Water count Function
void waterCount() {
  NbTopsFan = 0;     //Set NbTops to 0 ready for calculations
  NbTopsFan2 = 0;
  sei();           //Enables interrupts
  delay (1000);     //Wait 1 second
  cli();           //Disable interrupts
  Calc = (NbTopsFan * 60 / 7.5); //(Pulse frequency x 60) / 7.5Q, = flow rate in L/hour
  Calc_sec = (NbTopsFan * 60 / 7.5) / 3600; //(Pulse frequency x 60) / 7.5Q, = flow rate in L/sec
  total = total + Calc_sec;

  Calc2 = (NbTopsFan2 * 60 / 7.5); //(Pulse frequency x 60) / 7.5Q, = flow rate in L/hour
  Calc_sec2 = (NbTopsFan2 * 60 / 7.5) / 3600; //(Pulse frequency x 60) / 7.5Q, = flow rate in L/sec
  total2 = total2 + Calc_sec2;
}
