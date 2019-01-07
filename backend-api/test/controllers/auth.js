/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env mocha */

require('dotenv').load();

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

const api = require('../../src/server');

chai.use(chaiHttp);

describe('auth', () => {

    describe('post invalid social token (web)', () => {
        it('should return status 401', async () => {
            const response = await chai.request(api).post(`/api/auth/login`).send({ social_token: 'invalid_social_token' });
            chai.expect(response).to.have.status(401);
        });
    });


    describe('post invalid social token (mobile)', () => {
        it('should return status 401', async () => {
            const response = await chai.request(api).post(`/api/auth/login/mobile`).send({ social_token: 'invalid_social_token' });
            chai.expect(response).to.have.status(401);
        });
    });

});