## This is just a very simple program to run and test the embedded part in the very begining :) So we don't have any error checking in here.

import time
import paho.mqtt.client as mqtt


broker="broker.hivemq.com" ##free online borker

#define callback
def on_message(client, userdata, message):
    time.sleep(1) #to give client time to connect
    print("received message =",str(message.payload.decode("utf-8")))

client= mqtt.Client("car-000001") #Client ID (Car-000001) should be a uniqe code for each car
######Bind function to callback
client.on_message=on_message
#####
print("connecting to broker ",broker)
client.connect(broker)#connect
client.loop_start() #start loop to process received messages

print("subscribing ")
client.subscribe("Sensors/FrontLeftDoorSensor") #subscribe to the sensor (or probably we should encode several sensors in one message)
time.sleep(2)

print("publishing ")
client.publish("Sensors/FrontLeftDoorSensor","Open")#publish
time.sleep(10)
client.disconnect() #disconnect
client.loop_stop() #stop loop
