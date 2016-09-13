'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server/app'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

const REGISTER_DATA_ERROR = 'Login/password contains spaces or was empty';

describe('Registration tests', () => {
    before(function() {
        User.remove().exec();
    });

    it('Register with correct data', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'test', password: 'test'})
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
            .send({login: 'test', password: 'tes'})
            .end((err, res) => {
                let regCheck = res.text.includes('is existing. Enter another Login');
                regCheck.should.be.true;
                User.find({login: 'test', password: 'tes'}, function(err, user) {
                    let length = user.length;
                    length.should.equal(0);
                    done();
                });
            })
    });
    it('Register with spaces in login', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'test ', password: 'tes'})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.find({login: 'test ', password: 'tes'}, function(err, user) {
                    let length = user.length;
                    length.should.equal(0);
                    done();
                });
            })
    });
    it('Register with spaces in password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'test', password: 'tes  '})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.find({login: 'test', password: 'tes  '}, function(err, user) {
                    let length = user.length;
                    length.should.equal(0);
                    done();
                });
            })
    });
    it('Register with spaces in login and password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: ' ', password: ' '})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.find({login: ' ', password: ' '}, function(err, user) {
                    let length = user.length;
                    length.should.equal(0);
                    done();
                });
            })
    });
    it('Register with empty login', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: '', password: 'pass'})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.find({login: '', password: 'pass'}, function(err, user) {
                    let length = user.length;
                    length.should.equal(0);
                    done();
                });
            })
    });
    it('Register with empty password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'log', password: ''})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.find({login: 'log', password: ''}, function(err, user) {
                    let length = user.length;
                    length.should.equal(0);
                    done();
                });
            })
    });
    it('Register with empty login and password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: '', password: ''})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.find({login: '', password: ''}, function(err, user) {
                    let length = user.length;
                    length.should.equal(0);
                    done();
                });
            })
    });
});

describe('Authorization tests', () => {

    afterEach((done) => {
        agent
            .get('/logout')
            .end((err, res) => {
                done()
            });
    });

    after(function() {
        User.remove().exec();
    });

    it('Auth with correct login/password', (done) => {
        agent
            .post('/login')
            .send({ login: 'test', password: 'test' })
            .end((err, res) => {
                let regCheck = res.text.includes('test');
                regCheck.should.be.true;
                done();
            });
    });

    it('Auth with correct login / wrong password', (done) => {
        agent
            .post('/login')
            .send({login: 'testt', password: 'test'})
            .end((err, res) => {
                let regCheck = res.text.includes('testt');
                regCheck.should.be.false;
                done();
            });
    });
    it('Auth with wrong login / correct password', (done) => {
        agent
            .post('/login')
            .send({login: 'test', password: 'testt'})
            .end((err, res) => {
                let regCheck = res.text.includes('test');
                regCheck.should.be.false;
                done();
            });
    });
});
