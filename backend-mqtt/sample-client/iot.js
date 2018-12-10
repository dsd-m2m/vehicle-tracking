/* eslint-disable no-console */
require('dotenv').config();
const AWS = require('aws-sdk');
AWS.config = new AWS.Config({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});
// DOCS: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IotData.html
const iotData = new AWS.IotData({ endpoint: process.env.IOT_ENDPOINT });

/////////////////
// IMPORTANT
// Thing shadowState has two important Obj: {reported:{}, desired:{}}
// if you want to turn on the car or something, you put the request in desired Obj
// you can read the current status of the car in reported Obj
// after car read your commands in desired Obj, it will act on it and update the reported Obj accordingly
/////////////////

const thingName = '1T7HT4B27X1183680';
const newState = {
	state: {
		desired: { engine: false, ac: false, radiator: false },
	},
};

iotData.updateThingShadow(
	{
		thingName,
		payload: JSON.stringify(newState),
	},
	function (err, data) {
		if (err) console.log(err);
		else console.log(data); // successful response
	},
);

iotData.getThingShadow({ thingName }, (err, data) => {
	if (err) console.log(err);
	else console.log(data); // successful response
});
