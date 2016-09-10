const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server/app');
chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Authorization tests', () => {
    it('Login with correct login/password', (done) => {
        agent
            .post('/login')
            .send({ username: 'jo', password: 'ji' })
            .end((err, res) => {
                res.should.have.cookie('session');
                done();
            });
    });
    it('Login with correct login / wrong password', (done) => {
        agent
            .post('/login')
            .send({username: 'j11', password: 'ji'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.cookie('session');
                done();
            })
    });
    it('Login with wrong login / correct password', (done) => {
        agent
            .post('/login')
            .send({username: 'jo', password: 'jie'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.cookie('session');
                done();
            })
    });
});

/*
describe('Registration tests', () => {
    it('Register');
    it('Register with existing login');
});
*/
