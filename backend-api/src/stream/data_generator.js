const faker = require('faker');

module.exports = (io) => {
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
