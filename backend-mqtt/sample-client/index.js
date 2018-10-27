const awsIot = require('aws-iot-device-sdk');
const config = require('./config.json');

// Device is an instance returned by mqtt.Client(), see mqtt.js
const device = awsIot.device({
	keyPath: config.keyPath,
	certPath: config.certPath,
	caPath: config.caPath,
	clientId: config.clientId,
	host: config.host,
});

device.on('connect', () => {
	console.log('connect!');
	device.subscribe('tcu');

	console.log('\n======Emulating Sensor Data========\n');
	setInterval(() => {
		//Generate Random Sensor Data
		var temperature = Math.floor(Math.random() * 110 + 1);
		var rpm = Math.floor(Math.random() * 1000 + 1);

		const data = { temperature, rpm }; //JSON Data
		device.publish('tcu', JSON.stringify(data)); //Publish data to AWS as STRING
	}, 5000);
});

//Read data from Topic, you have to subscribe when connected:
device.on('message', (topic, payload) => {
	console.log(topic, ':', payload.toString());
});

device.on('close', () => {
	console.log('close');
});
device.on('reconnect', () => {
	console.log('reconnect');
});
device.on('offline', () => {
	console.log('offline');
});
device.on('error', error => {
	console.log('error', error);
});
