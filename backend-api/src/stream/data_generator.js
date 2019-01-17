/* eslint-disable no-console */
const faker = require('faker');
const awsIot = require('aws-iot-device-sdk');


const device = awsIot.device({
    keyPath: 'certs/2c85921b45-private.pem.key',
    certPath: 'certs/2c85921b45-certificate.pem.crt',
    caPath: 'certs/root-CA.crt',
    clientId: process.env.IOT_CLIENT_ID,
    host: process.env.IOT_ENDPOINT,
});

const setupStreaming = (io) => {
    device.on('connect', () => {
        console.log('connect to MQTT!');
        device.subscribe('tcu');

        /*  for testing purposes
                setInterval(() => {
        
                    const carSpeed = Math.floor(Math.random() * 110 + 1);
                    const MotorRpm = Math.floor(Math.random() * 1000 + 1);
                    const timestamp = Date.now();
                    const vin = '1T7HT4B27X1183680';
        
                    const data = { carSpeed, MotorRpm, timestamp, vin};
                    device.publish('tcu', JSON.stringify(data));
                }, 3000); */
    });

    device.on('message', (topic, payload) => {
        console.log(topic, ':', payload.toString());
        if (topic === 'tcu') {
            const data = JSON.parse(payload);
            if (data.vin) {
                io.emit(data.vin, payload.toString());
            }
        }
    });

    device.on('close', () => {
        console.log('close MQTT');
    });
    device.on('reconnect', () => {
        console.log('reconnect MQTT');
    });
    device.on('offline', () => {
        console.log('offline MQTT');
    });
    device.on('error', error => {
        console.log('error MQTT', error);
    });
}

const fakeGenerator = (io) => {
    setInterval(() => {
        if (io.engine.clientsCount > 0) {
            const testVin = '1T7HT4B27X1183680';
            const message = {};
            message.vin = testVin;
            message.carSpeed = Math.floor(Math.random() * 110 + 1);
            message.MotorRpm = Math.floor(Math.random() * 1000 + 1);
            message.timestamp = Date.now();
            message.altitude = Math.floor(Math.random() * 200 + 1);
            message.createdAt = Date.now();
            message.latitude = faker.address.latitude();
            message.longitude = faker.address.longitude();
            message.powerMotorTotal = Math.floor(Math.random() * 10000 + 1);
            message.torqueMotor = Math.floor(Math.random() * 500 + 1);
            io.emit(testVin, JSON.stringify(message));
        }
    }, 1000);
};

module.exports = { setupStreaming, fakeGenerator };
