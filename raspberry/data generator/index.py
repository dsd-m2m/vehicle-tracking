from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import json
import time
import simplejson #for decimal support

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

topic = "tcu"
client.connect()
client.subscribe(topic, 1, customCallback)

fake = Faker()

loopCount = 0
while True:
    message = {}
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
    print('Published topic %s: %s\n' % (topic, messageSJson))
    time.sleep(2)
    loopCount += 1
