'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const chai = require('chai');

let user;
let admin;
let master;

const should = chai.should();

describe('user service', () => {
  before((done) => {
    chai.request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({
        strategy: 'local',
        email: 'normal',
        password: 'password',
      })
      .end((err, res) => {
        user = res.body.accessToken;

        chai.request(app)
          .post('/api/login')
          .set('Accept', 'application/json')
          .send({
            strategy: 'local',
            email: 'admin',
            password: 'password',
          })
          .end((err, res) => {
            admin = res.body.accessToken;

            chai.request(app)
              .post('/api/login')
              .set('Accept', 'application/json')
              .send({
                strategy: 'local',
                email: 'master',
                password: 'password',
              })
              .end((err, res) => {
                master = res.body.accessToken;

                done();
              });
          });
      });
  });

  it('registered the user service', () => {
    assert.ok(app.service('/api/user'));
  });

  it('should allow creation of a new account with valid signup token', (done) => {
    chai.request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({
        firstName: 'New',
        lastName: 'User',
        password: 'password',
        email: 'email@nothing.com',
        email: 'newuser',
        signupToken: 'TOKEN_1'
      })
      .end((err, res) => {
        res.should.have.status(201);

        res.body.should.not.have.property('password');

        done();
      });
  });

  it('created user should have organization properties set', (done) => {
    chai.request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({
        firstName: 'New',
        lastName: 'User',
        password: 'password',
        email: 'email2@nothing.com',
        email: 'newuser2',
        signupToken: 'TOKEN_2'
      })
      .end(async (err, res) => {
        res.body.should.have.property('currentOrganizationId');
        res.should.have.status(201);

        const user = await app.get('sequelize').models.user.findOne({
          where: {
            id: res.body.id,
          },
          include: [{
            model: app.get('sequelize').models.organization
          }]
        });

        user.should.have.property('organizations');
        
        done();
      });
  });

  it('should allow for editing multiple protected fields at once', () => {

  });

  it('should allow editing for roles for authorized users', async (done) => {
    const user = await app.get('sequelize').models.user.findOne({
      where: {
        email: 'editroles',
      },
    });

    chai.request(app)
      .patch(`/api/user/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(master))
      .send({
        roles: 'admin'
      })
      .end(async (err, res) => {
        res.should.have.status(200);

        const updatedUser = await app.get('sequelize').models.user.findOne({
          where: {
            id: user.id,
          },
          include: [{
            model: app.get('sequelize').models.organization,
            where: {
              '$organizations.organization_users.organizationId$': user.currentOrganizationId,
            },
          }]
        });

        assert.equal(updatedUser.organizations[0].organization_users.roles, 'admin');

        done();
      });
  });

  it('should allow admin to add users to organization', async (done) => {
    const models = app.get('sequelize').models;

    const user = await models.user.findOne({
      where: {
        email: 'editorganizations',
      },
    });

    const organization = await models.organization.findOne({
      where: {
        name: 'utdtv',
      },
    });

    chai.request(app)
      .patch(`/api/user/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(master))
      .send({
        organizationId: organization.id,
      })
      .end(async (err, res) => {
        res.should.have.status(200);

        done();
      });
  });

  it('should find device managers', (done) => {
    const models = app.get('sequelize').models;

    chai.request(app)
      .get(`/api/user?deviceManager=true`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(admin))
      .end((err, res) => {
        res.should.have.status(200);

        assert.equal(res.body.length, 1);

        assert.equal(res.body[0].email, 'devicemanager');

        done();
      });
  });

  it('should find device managers', (done) => {
    chai.request(app)
      .get(`/api/user?deviceManager=true`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(admin))
      .end((err, res) => {
        res.should.have.status(200);

        assert.equal(res.body.length, 1);

        assert.equal(res.body[0].email, 'devicemanager');

        done();
      });
  });

  it('should find user by barcode', (done) => {
    chai.request(app)
      .get(`/api/user?barcode=NORMAL`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(admin))
      .end((err, res) => {
        res.should.have.status(200);

        assert.equal(res.body.length, 1);

        assert.equal(res.body[0].email, 'normal');

        done();
      });
  });

  // TODO test editing each of these user fields
});
