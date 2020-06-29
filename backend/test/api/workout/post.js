process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../../app');
const db = require('../../../db/index');
const { largePost, missingDataPost } = require('../../utils/dummyData');

describe('POST /workout', () => {
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

  it('OK, creating a new entry workout', (done) => {
    request(app).post('/api/v1/workout')
      .send(largePost)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        const { body } = res;

        // console.log(body);

        /* Workout */
        expect(body).to.contain.property('_id').to.be.a('string').length.within(15, 100);
        expect(body).to.contain.property('type').to.equal('crossfit');
        expect(body).to.contain.property('start').to.equal('2020-04-12T20:50:40.000Z');
        expect(body).to.contain.property('end').to.equal('2020-04-12T21:41:29.000Z');
        expect(body).to.contain.property('grade').to.equal(8);
        expect(body).to.not.contain.property('bogusData');

        /* Exercises */
        expect(body).to.contain.property('exercises').to.be.an('array');

        body.exercises.map((obj, i) => {
          expect(obj).to.be.an('object');
          expect(obj).to.contain.property('_id').to.be.a('string');
          expect(obj).to.contain.property('unilateral', false);
          expect(obj).to.contain.property('secondaryMuscles').to.be.an('array');
          expect(obj).to.contain.property('sets').to.be.an('array');

          if (i === 0) {
            obj.secondaryMuscles.map((val, i) => {
              if (i === 0) {
                expect(val).to.equal('triceps');
              } else if (i === 1) {
                expect(val).to.equal('front delt');
              }
            });

            /* Sets */
            obj.sets.map((set, i) => {
              expect(set).to.be.an('object');
              expect(set).to.contain.property('weight', 26);

              if (i === 0) {
                expect(set).to.contain.property('reps', 10);
                expect(set).to.contain.property('rest', '120');
                expect(set).to.contain.property('time', '720');
              } else if (i === 1) {
                expect(set).to.contain.property('reps', 7);
                expect(set).to.contain.property('rest', '2');
                expect(set).to.contain.property('time', '4');
              }
            });
          }
        });

        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, missing start value', (done) => {
    request(app).post('/api/v1/workout')
      .send(missingDataPost)
      .expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        const { body } = res;
        console.log(body);
        // expect(body).to.contain('Workout validation failed: start: Path `start` is required.');
        expect(body).to.not.contain.property('bogusData');
        done();
      })
      .catch((err) => done(err));
  });
});
