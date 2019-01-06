/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env mocha */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');


const api = require('../src/server');

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


});