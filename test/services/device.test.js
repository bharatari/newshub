const assert = require('assert');
const app = require('../../src/app');
const chai = require('chai');
const _ = require('lodash');

const should = chai.should();

describe('\'device\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/device');

    assert.ok(service, 'Registered the service');
  });

  it('registered the device service', () => {
    assert.ok(app.service('/api/device'));
  });

  it('should allow masters to create a device', (done) => {
    chai.request(app)
      .post('/api/device')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(master))
      .send({
        name: 'DEVICE1',
        label: 'Device',
        type: 'Device',
        quantity: 1,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should not allow admins to create a device', (done) => {
    chai.request(app)
      .post('/api/device')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(admin))
      .send({
        name: 'DEVICE2',
        label: 'Device',
        type: 'Device',
        quantity: 1,
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should not allow normal users to create a device', (done) => {
    chai.request(app)
      .post('/api/device')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(user))
      .send({
        name: 'DEVICE3',
        label: 'Device',
        type: 'Device',
        quantity: 1,
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should not return device within organization', async (done) => {
    const device = await app.get('sequelize').models.device.findOne({
      where: {
        name: 'Zoom H6'
      }
    });

    chai.request(app)
      .get(`/api/device/${device.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(user))
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should return device within organization', async (done) => {
    const device = await app.get('sequelize').models.device.findOne({
      where: {
        name: 'Mixer 1 Tascam'
      }
    });

    chai.request(app)
      .get(`/api/device/${device.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(user))
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return devices within organization', async (done) => {
    const orgUser = await app.get('sequelize').models.user.findOne({
      where: {
        username: 'normal',
      },
    });

    chai.request(app)
    .get(`/api/device?$limit=10`)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer '.concat(user))
    .end((err, res) => {
      res.should.have.status(200);

      const data = res.body.data;

      const inOrg = _.every(data, (value, index, array) => {
        if (value.organization.id === orgUser.currentOrganizationId) {
          return true;
        }

        return false;
      });

      inOrg.should.equal(true);

      done();
    });
  });
});
