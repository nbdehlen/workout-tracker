process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const index = require('../../../api/routes');
const db = require('../../../db/index');
const app = require('../../../app');
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

  it('Fail, id not found', (done) => {
    request(app).post('/api/v1/workout')
      .send(smallPost)
      .then((res) => {
        request(app).patch('/api/v1/workout/incorrectId')
          .send(patchData)
          .expect('Content-Type', /json/)
          .expect(500)
          .then((res) => {
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('Fail, faulty values', (done) => {
    request(app).post('/api/v1/workout')
      .send(smallPost)
      .then((res) => {
        request(app).patch('/api/v1/workout/fail')
          .send(faultyPost)
          .expect('Content-Type', /json/)
          .expect(500)
          .then((res) => {
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
