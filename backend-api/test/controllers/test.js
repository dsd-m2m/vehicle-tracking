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

describe('test', () => {

	describe('get ping public', () => {
		it('should return status 200', async () => {
			const response = await chai.request(api).get(`/api/ping/public`);
			chai.expect(response).to.have.status(200);
		});
	});

	describe('get ping secure', () => {
		it('should return status 401', async () => {
			const response = await chai.request(api).get(`/api/ping/secure`);
			chai.expect(response).to.have.status(401);
		});
	});

	describe('get ping secure with login (VO)', () => {
		it('should return status 200', async () => {
			const response = await withLoginVehicleOwner(chai.request(api).get(`/api/ping/secure`));
			chai.expect(response).to.have.status(200);
		});
	});

	describe('get ping secure with login (OEM)', () => {
		it('should return status 200', async () => {
			const response = await withLoginOEM(chai.request(api).get(`/api/ping/secure`));
			chai.expect(response).to.have.status(200);
		});
	});
});