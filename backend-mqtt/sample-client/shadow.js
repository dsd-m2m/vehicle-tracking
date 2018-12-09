const awsIot = require('aws-iot-device-sdk');
const config = require('./config.json');

// It's possible to use the thingShadow connection to also publish data on MQTT topics
// it can do all the things in index.js file

const thingShadows = awsIot.thingShadow({
	keyPath: config.keyPath,
	certPath: config.certPath,
	caPath: config.caPath,
	clientId: config.clientId,
	host: config.host,
});

const newState = {
	state: {
		desired: {
			engine: true,
			ac: true,
		},
	},
};

/////////////////
// Two main steps:
// 1. Listen to incoming changes to shadowState and update car status accordingly (desired Obj)
// 2. Publish again to the shadowState successful changes (reported Obj)
/////////////////

// Client token value returned from thingShadows.update() operation
let clientTokenUpdate;

thingShadows.on('connect', function() {
	thingShadows.register(config.clientId, {}, function() {
		clientTokenUpdate = thingShadows.update(config.clientId, newState);
		//
		// The update method returns a clientToken; if non-null, this value will
		// be sent in a 'status' event when the operation completes, allowing you
		// to know whether or not the update was successful.  If the update method
		// returns null, it's because another operation is currently in progress and
		// you'll need to wait until it completes (or times out) before updating the
		// shadow.
		//
		if (clientTokenUpdate === null) {
			console.log('update shadow failed, operation still in progress');
		}
	});
});

//
// The Device Shadow service publishes a message to this topic when it accepts a shadow update
// and the resulting shadow contains different values for desired and reported states.
//
thingShadows.on('delta', function(thingName, stateObject) {
	console.log('received delta on ' + thingName + ': ' + JSON.stringify(stateObject));

	// IMPORTANT: Here you read the desired state and update car accordingly
	// then you update reported Obj
});

thingShadows.on('status', function(thingName, stat, clientToken, stateObject) {
	console.log(
		'received ' + stat + ' on ' + thingName + ': ' + JSON.stringify(stateObject),
	);
	//
	// These events report the status of update(), get(), and delete()
	// calls.  The clientToken value associated with the event will have
	// the same value which was returned in an earlier call to get(),
	// update(), or delete().  Use status events to keep track of the
	// status of shadow operations.
	//
});

thingShadows.on('timeout', function(thingName, clientToken) {
	console.log('received timeout on ' + thingName + ' with token: ' + clientToken);
	//
	// In the event that a shadow operation times out, you'll receive
	// one of these events.  The clientToken value associated with the
	// event will have the same value which was returned in an earlier
	// call to get(), update(), or delete().
	//
});
