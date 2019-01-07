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
const User = require('../../src/models/user').user;

chai.use(chaiHttp);

describe('user', () => {

    before(async () => {

        await User.findOrCreate({
            where: {
                id: 3
            },
            defaults: {
                id: 3,
                email: "user_for_deletion@gmail.com",
                roleId: 1,
                username: "TEST",
                pic: "",
                creationDate: new Date(),

            }
        }).catch(() => {
            throw Error('SequelizeError');
        });
    });
    describe('get all users (VO)', () => {
        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/user`));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('get all users (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/user`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('get one user (VO)', () => {
        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/user/${1}`));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('get one user (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/user/${1}`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('get my user info (VO)', () => {
        it('should return status 200', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).get(`/api/me`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('get my user info (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/me`));
            chai.expect(response).to.have.status(200);
        });
    });

    describe('delete single user (VO)', () => {
        it('should return status 403', async () => {
            const response = await withLoginVehicleOwner(chai.request(api).delete(`/api/user/${3}`));
            chai.expect(response).to.have.status(403);
        });
    });

    describe('delete single user (OEM)', () => {
        it('should return status 200', async () => {
            const response = await withLoginOEM(chai.request(api).get(`/api/user/${3}`));
            chai.expect(response).to.have.status(200);
        });
    });

});