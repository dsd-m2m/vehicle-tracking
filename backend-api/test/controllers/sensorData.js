/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env mocha */

require('dotenv').load();

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

const withLoginVehicleOwner = require('../utils').withLoginVehicleOwner;
const withLoginOEM = require('../utils').withLoginOEM;
const api = require('../../src/server');

chai.use(chaiHttp);

describe('sensorData', () => {

    describe('get sensor data for vehicle', () => {
        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).put(`/api/vehicle/1T7HT4B27X1183680/subscribe`));
            chai.expect(response).to.have.status(200);
        });
        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/sensorData/1T7HT4B27X1183680`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('get sensor data for vehicle', () => {
        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/sensorData/non_existent_vin`));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('get all sensor data', () => {
        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/sensorData`));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('get all sensor data', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/sensorData`));
            chai.expect(response).to.have.status(200);
        });
    });
    
    describe('get sensor data for one car (csv export)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/sensorData/1T7HT4B27X1183680/export`));
            chai.expect(response).to.have.status(200);
        });
    });
});