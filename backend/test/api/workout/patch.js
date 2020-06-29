process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../../app');
const db = require('../../../db/index');

const { smallPost, faultyPost, patchData } = require('../../utils/dummyData');

describe('PATCH /workout', () => {
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((error) => done(error));
  });

  after((done) => {
    db.disconnect()
      .then(() => done())
      .catch((error) => done(error));
  });

  it('OK, patching workout', (done) => {
    request(app).post('/api/v1/workout')
      .send(smallPost)
      .then((res) => {
        request(app).patch(`/api/v1/workout/${res.body._id}`)
          .send(patchData)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
            const { body } = res;
            expect(body).to.contain.property('start', '2020-04-12T20:50:40.000Z');
            expect(body).to.contain.property('end', '2020-04-12T21:41:40.000Z');
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('Fail, faulty id value', (done) => {
    request(app).post('/api/v1/workout')
      .send(smallPost)
      .then((res) => {
        request(app).patch('/api/v1/workout/incorrectId')
          .send(patchData)
          .expect('Content-Type', /json/)
          .expect(400)
          .then((res) => {
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('Fail, id does not exist', (done) => {
    request(app).post('/api/v1/workout')
      .send(smallPost)
      .then((res) => {
        request(app).patch('/api/v1/workout/5ee6531987797c35b81f5704')
          .send(faultyPost)
          .expect('Content-Type', /json/)
          .expect(404)
          .then((res) => {
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
