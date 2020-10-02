process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../../app');
const db = require('../../../db/index');
const { smallPost } = require('../../utils/dummyData');


describe('GET /workout', () => {
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

  it('OK, getting empty workout', (done) => {
    request(app).get('/api/v1/workout')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const { body } = res;
        // console.log(body);
        expect(body).to.length(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, getting all workouts', (done) => {
    request(app).post('/api/v1/workout')
      .send(smallPost)
      .then((res) => {
        request(app).get('/api/v1/workout')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
            const { body } = res;
            // console.log(body);

            expect(body).length(1);
            expect(body[0]).to.contain.property('_id').to.be.a('string').length.within(15, 100);
            expect(body[0]).to.contain.property('type', 'strength');
            expect(body[0]).to.contain.property('start', '2020-04-12T20:50:40.000Z');
            expect(body[0]).to.contain.property('end', '2020-04-14T11:50:40.000Z');
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('OK, getting 1 workout by id', (done) => {
    request(app).post('/api/v1/workout')
      .send(smallPost)
      .then((res) => {
        // console.log(res.body._id);
        request(app).get(`/api/v1/workout/${res.body._id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
            const { body } = res;


            expect(body).to.contain.property('_id').to.be.a('string').length.within(15, 100);
            expect(body).to.contain.property('type', 'strength');
            expect(body).to.contain.property('start', '2020-04-12T20:50:40.000Z');
            expect(body).to.contain.property('end', '2020-04-14T11:50:40.000Z');
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
