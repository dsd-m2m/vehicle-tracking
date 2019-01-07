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

describe('role', () => {

    describe('get all roles (no auth)', () => {
        it('should return status 401', async () => {
            const response = await chai.request(api).get(`/api/role`);
            chai.expect(response).to.have.status(401);
        });
    });

    describe('get all roles (VO)', () => {
        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/role`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('get all roles (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/role`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('change user role (VO)', () => {
        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).post(`/api/role/changeUserRole`).send({userId: 2, newRoleId: 2}));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('change user role (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).post(`/api/role/changeUserRole`).send({userId: 1, newRoleId: 2}));
            chai.expect(response).to.have.status(200);
        });
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).post(`/api/role/changeUserRole`).send({userId: 1, newRoleId: 1}));
            chai.expect(response).to.have.status(200);
        });
    });
});