from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import json

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

# Publish to the same topic in a loop forever
loopCount = 0
while True:
    message = {}
    message['rpm'] = loopCount
    message['temperature'] = loopCount
    messageJson = json.dumps(message)
    client.publish(topic, messageJson, 1)
    print('Published topic %s: %s\n' % (topic, messageJson))
    time.sleep(5)
    loopCount += 1
