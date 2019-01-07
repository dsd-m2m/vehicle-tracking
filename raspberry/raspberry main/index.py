from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import json
import time
import simplejson #for decimal support

import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
from time import sleep # Import the sleep function from the time module

GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(8, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(9, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(10, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(11, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(12, GPIO.OUT, initial=GPIO.LOW)
from faker import Faker #using faker to produce mock sensors data

with open('config.json') as f:
    config = json.load(f)

client = AWSIoTMQTTClient(config["clientId"])
client.configureEndpoint(config["host"], config["port"])
client.configureCredentials(config["caPath"], config["keyPath"], config["certPath"])

client.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
client.configureDrainingFrequency(2)  # Draining: 2 Hz
client.configureConnectDisconnectTimeout(10)  # 10 sec
client.configureMQTTOperationTimeout(5)  # 5 sec


# Custom MQTT message callback
def customCallback(client, userdata, message):
    print("Received a new message: ")
    print(message.payload)
    print("from topic: ")
    print(message.topic)
    print("--------------\n\n")

# Commands MQTT callback
def commandsCallback(client, userdata, message): #send commands for turning on and off the desired feature of the car!
    string = str(message.payload)    
   if re.search(r'\d+', string).group() == 'lights-on'
	GPIO.output(8, GPIO.HIGH)
   elif re.search(r'\d+', string).group() == 'hazzard-on'
	GPIO.output(9, GPIO.HIGH)
   elif re.search(r'\d+', string).group() == 'horn-on'
	GPIO.output(10, GPIO.HIGH)
   elif re.search(r'\d+', string).group() == 'radiator-on'
	GPIO.output(11, GPIO.HIGH)
   elif re.search(r'\d+', string).group() == 'fan-on'
	GPIO.output(12, GPIO.HIGH)
   elif re.search(r'\d+', string).group() == 'lights-off'
	GPIO.output(8, GPIO.LOW)
   elif re.search(r'\d+', string).group() == 'hazzard-off'
	GPIO.output(9, GPIO.LOW)
   elif re.search(r'\d+', string).group() == 'horn-off'
	GPIO.output(10, GPIO.LOW)
   elif re.search(r'\d+', string).group() == 'radiator-off'
	GPIO.output(11, GPIO.LOW)
   elif re.search(r'\d+', string).group() == 'fan-off'
	GPIO.output(12, GPIO.LOW)
topic = "tcu"
commandTopic = "commands"
client.connect()
client.subscribe(topic, 1, customCallback)
client.subscribe(commandTopic, 1, commandsCallback)



fake = Faker()

loopCount = 0
while True:

    #uncomment for testing led connection only
    #while True:
    #	GPIO.output(8, GPIO.HIGH)
    #	print "LED on"
    #	time.sleep(1)	
    #	GPIO.output(8, GPIO.LOW)
    #	time.sleep(1)
    #	print "LED off"

    message = {}
    commandMessage = {}

    commandMessage['LED'] = loopCount % 2

    message['MotorRpm'] = loopCount #speed of the motor
    message['tempOilMotor'] = loopCount #temperature of the oil
    message['torqueMotor'] = loopCount #torque of the motor
    message['powerMotorTotal'] = loopCount #calculated power of the motor
    message['altitude'] = loopCount #altitude of the car 
    message['latitude'] = fake.latlng()[0] #gps latitude
    message['longitude'] = fake.latlng()[1] #gps longitude
    message['carSpeed'] = loopCount #speed of the car (instant speed)
    message['timeStamp'] = time.time() #time stamp for the above results

    messageSJson = simplejson.dumps(message)
    client.publish(topic, messageSJson, 1)

    messageSJson = simplejson.dumps(commandMessage)
    client.publish(commandTopic, messageSJson, 1)

    print('Published topic %s: %s\n' % (topic, messageSJson))
    time.sleep(2)
    loopCount += 1
