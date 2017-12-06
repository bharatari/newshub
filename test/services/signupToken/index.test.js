'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const chai = require('chai');

let user;
let admin;
let master;

const should = chai.should();

describe('signupToken service', () => {
  before((done) => {
    this.server = app.listen(3030);

    chai.request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({
        strategy: 'local',
        username: 'normal',
        password: 'password',
      })
      .end((err, res) => {
        user = res.body.accessToken;

        chai.request(app)
          .post('/api/login')
          .set('Accept', 'application/json')
          .send({
            strategy: 'local',
            username: 'admin',
            password: 'password',
          })
          .end((err, res) => {
            admin = res.body.accessToken;

            chai.request(app)
              .post('/api/login')
              .set('Accept', 'application/json')
              .send({
                strategy: 'local',
                username: 'master',
                password: 'password',
              })
              .end((err, res) => {
                master = res.body.accessToken;

                done();
              });
          });
      });
  });

  after((done) => {
    this.server.close(() => {
      done();
    });
  });

  it('registered the signupToken service', () => {
    assert.ok(app.service('/api/signup-token'));
  });

  it('should allow authorized user to create a reservation', (done) => {
    chai.request(app)
      .post('/api/signup-token')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(master))
      .send({})
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should not allow normal user to create a token', (done) => {
    chai.request(app)
      .post('/api/signup-token')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(user))
      .send({})
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
