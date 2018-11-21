from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import json
import time
import simplejson #for decimal support

from faker import Faker

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
    message['MotorRpm'] = loopCount
    message['tempOilMotor'] = loopCount
    message['torqueMotor'] = loopCount
    message['powerMotorTotal'] = loopCount
    message['altitude'] = loopCount
    message['latitude'] = fake.latlng()[0]
    message['longitude'] = fake.latlng()[1]
    message['carSpeed'] = loopCount
    message['timeStamp'] = time.time()
    messageSJson = simplejson.dumps(message)
    client.publish(topic, messageSJson, 1)
    print('Published topic %s: %s\n' % (topic, messageSJson))
    time.sleep(2)
    loopCount += 1
