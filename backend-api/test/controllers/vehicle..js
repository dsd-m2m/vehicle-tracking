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

describe('vehicle', () => {

    describe('get vehicles (VO)', () => {
        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/vehicle`));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('get vehicles (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/vehicle`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('create one vehicle (OEM)', () => {
        it('should return status 200', async () => {
            const testVehicle = {
                vin: "test",
                model: "test_model",
                manufacturer: "test_manufacturer",
                manufactureYear: "2019"
            };
            const response = await withLoginOEM(chai.request(api).post(`/api/vehicle`).send(testVehicle));
            chai.expect(response).to.have.status(200);
            chai.expect(response.body.vin).to.be.equal('test');
        });
    });

    describe('update one vehicle (VO)', () => {
        it('should return status 200', async () => {
            const testVehicle = {
                vin: "test",
                model: "test_model2",
                manufacturer: "test_manufacturer2",
                manufactureYear: 2020
            };
            const response = await withLoginOEM(chai.request(api).put(`/api/vehicle/test`).send(testVehicle));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('get one vehicle (VO)', () => {
        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/vehicle/test`));
            chai.expect(response).to.have.status(200);
            chai.expect(response.body.vin).to.be.equal('test');
            chai.expect(response.body.model).to.be.equal('test_model2');
            chai.expect(response.body.manufacturer).to.be.equal('test_manufacturer2');
            chai.expect(response.body.manufactureYear).to.be.equal(2020);

        });
    });

    describe('get one vehicle (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/vehicle/test`));
            chai.expect(response).to.have.status(200);
            chai.expect(response.body.vin).to.be.equal('test');
            chai.expect(response.body.model).to.be.equal('test_model2');
            chai.expect(response.body.manufacturer).to.be.equal('test_manufacturer2');
            chai.expect(response.body.manufactureYear).to.be.equal(2020);
        });
    });

    describe('get one non-existent vehicle (OEM)', () => {
        it('should return status 400', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/vehicle/non_existent_vehicle`));
            chai.expect(response).to.have.status(400);
        });
    });

    describe('subscribe to one vehicle (VO)', () => {
        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).put(`/api/vehicle/test/subscribe`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('subscribe to one vehicle (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).put(`/api/vehicle/test/subscribe`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('subscribe to one non-existent vehicle (OEM)', () => {
        it('should return status 400', async () => {
            const response = await withLoginOEM(chai.request(api).put(`/api/vehicle/non_existent_vehicle/subscribe`));
            chai.expect(response).to.have.status(400);
        });
    });

    describe('unsubscribe from one vehicle (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).put(`/api/vehicle/test/unsubscribe`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('unsubscribe from one vehicle (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).put(`/api/vehicle/test/unsubscribe`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('unsubscribe from one non-existent vehicle (OEM)', () => {
        it('should return status 403', async () => {
            const response = await withLoginOEM(chai.request(api).put(`/api/vehicle/non-existent-vehicle/unsubscribe`));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('delete one vehicle (VO)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).delete(`/api/vehicle/test`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('subscribe, get and send command to the vehicle, unsubscribe (VO)', () => {

        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).put(`/api/vehicle/1T7HT4B27X1183680/subscribe`));
            chai.expect(response).to.have.status(200);
        });

        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/vehicle/1T7HT4B27X1183680/command`));
            chai.expect(response).to.have.status(200);
        });

        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).put(`/api/vehicle/1T7HT4B27X1183680/command`).send({ engine: true, ac: true, radiator: false }));
            chai.expect(response).to.have.status(200);
        });

        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/vehicle/1T7HT4B27X1183680/command`));
            chai.expect(response).to.have.status(200);
        });

        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).put(`/api/vehicle/1T7HT4B27X1183680/unsubscribe`));
            chai.expect(response).to.have.status(200);
        });

        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/vehicle/1T7HT4B27X1183680/command`));
            chai.expect(response).to.have.status(403);
        });

        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).put(`/api/vehicle/1T7HT4B27X1183680/command`).send({ engine: true, ac: true, radiator: false }));
            chai.expect(response).to.have.status(403);
        });
    });
});