const awsIot = require('aws-iot-device-sdk');
const config = require('./config.json');

const sampleData = require('./sample_data.json');

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
	console.log('\n======Importing Sensor Data========\n');

	for (const data of sampleData) device.publish('tcu', JSON.stringify(data)); //Publish data to AWS as STRING
});
