'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server/app'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Authorization tests', () => {

    afterEach((done) => {
        agent
            .get('/logout')
            .end((err, res) => {
                done()
            });
    });

    it('Auth with correct login/password', (done) => {
        agent
            .post('/login')
            .send({ username: 'jo', password: 'ji' })
            .end((err, res) => {
                let regCheck = res.text.includes('jo');
                regCheck.should.be.true;
                done();
            });
    });

    it('Auth with correct login / wrong password', (done) => {
        agent
            .post('/login')
            .send({username: 'j11', password: 'ji'})
            .end((err, res) => {
                let regCheck = res.text.includes('j11');
                regCheck.should.be.false;
                done();
            });
    });
    it('Auth with wrong login / correct password', (done) => {
        agent
            .post('/login')
            .send({username: 'jo', password: 'jie'})
            .end((err, res) => {
                let regCheck = res.text.includes('jo');
                regCheck.should.be.false;
                done();
            });
    });
});

describe('Registration tests', () => {
    before(function() {
        User.find({login: 'test'}).remove().exec();
    });
    after(function() {
        User.find({login: 'test'}).remove().exec();
    });

    it('Register', (done) => {
        chai.request(server)
            .post('/reg')
            .send({username: 'test', password: 'test'})
            .end((err, res) => {
                let regCheck = res.text.includes('test was registered');
                regCheck.should.be.true;
                User.find({login: 'test', password: 'test'}, function(err, user) {
                    let length = user.length;
                    length.should.equal(1);
                    done();
                });
            });
    });
    it('Register with existing login', (done) => {
        chai.request(server)
            .post('/reg')
            .send({username: 'test', password: 'tes'})
            .end((err, res) => {
                let regCheck = res.text.includes('test was registered');
                regCheck.should.be.false;
                done();
            })
    });
});
