/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env mocha */

require('dotenv').load();

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../src/models/user').user;
const Vehicle = require('../src/models/user').vehicle;
const UserVehicle = require('../src/models/user').user_vehicle;

chai.use(chaiHttp);

before(async () => {

    await User.findOrCreate({
        where: {
            id: 1
        },
        defaults: {
            id: 1,
            email: "test_vo@gmail.com",
            roleId: 1,
            username: "TEST_VO",
            pic: "",
            creationDate: new Date(),

        }
    }).catch(() => {
        throw Error('SequelizeError');
    });

    await User.findOrCreate({
        where: {
            id: 2
        },
        defaults: {
            id: 2,
            email: "test_oem@gmail.com",
            roleId: 2,
            username: "TEST_OEM",
            pic: "",
            creationDate: new Date(),
        }
    }).catch(() => {
        throw Error('SequelizeError');
    });

    await Vehicle
        .findOrCreate({
            where: {
                vin: '1T7HT4B27X1183680'
            },
            defaults:
            {
                vin: '1T7HT4B27X1183680',
                model: 'Concept One',
                manufacturer: 'Rimac',
                manufactureYear: 2018
            }
        }).catch(() => {
            throw Error('SequelizeError');
        });
});



after(async () => {
    await UserVehicle.destroy({
        where: {},
    }).catch((err) => {
        throw Error('SequelizeError ', err);
    });
    await User.destroy({
        where: {},
    }).catch((err) => {
        throw Error('SequelizeError ', err);
    });

    await Vehicle.destroy({
        where: {},
    }).catch((err) => {
        throw Error('SequelizeError ', err);
    });
});