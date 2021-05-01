/* eslint-disable-file no-unused-expressions: 0 */
const chai = require('chai');
const expect = chai.expect; 
const request = require('supertest')
const app = require('../app.js');


const app = require('../src/app.js');

describe('POST /login', () => {

    it ('Should login and return auth token', (done) => {
        request(app)
            .post('/users/login')

    });

    it ('Should reject invalid login', (done) => {


    });

})