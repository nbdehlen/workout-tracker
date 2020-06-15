process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const index = require('../../../api/routes');

const app = express();
// const app = require('../../../app');
// const { postWorkout } = require('../../../controllers/Workout');
const db = require('../../../db/index');

app.use(express.json());
app.use('/api/v1', index);

const postTest = {
  type: 'crossfit',
  start: '2020-04-12T20:50:40.000Z',
  end: '2020-04-12T21:41:29.000Z',
  grade: 8,
  exercises: [
    {
      secondaryMuscles: ['triceps', 'front delt'],
      unilateral: false,
      sets: [
        {
          weight: 26,
          reps: 10,
          rest: '120',
          time: '720',
        },
        {
          weight: 26,
          reps: 7,
          rest: '2',
          time: '4',
        },
      ],
      exerciseType: 'strength',
      name: 'db press',
      compound: true,
      mainMuscle: 'chest',
      tool: 'dumbbell',
      length: '42',
      calories: 471,
    },
  ],
};

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

  it('OK, creating a new entry works', (done) => {
    request(app).post('/api/v1/workout')
      .send(postTest)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const { body } = res;

        console.log(body);

        /* Workout */
        expect(body).to.contain.property('_id').to.be.a('string').length.within(15, 100);
        expect(body).to.contain.property('type').to.equal('crossfit');
        expect(body).to.contain.property('start').to.equal('2020-04-12T20:50:40.000Z');
        expect(body).to.contain.property('end').to.equal('2020-04-12T21:41:29.000Z');
        expect(body).to.contain.property('grade').to.equal(8);

        /* Exercises */
        expect(body).to.contain.property('exercises').to.be.an('array');

        body.exercises.map((obj) => {
          expect(obj).to.be.an('object');
          expect(obj).to.contain.property('_id').to.be.a('string');
          expect(obj).to.contain.property('unilateral', false);
          expect(obj).to.contain.property('secondaryMuscles').to.be.an('array');
          expect(obj).to.contain.property('sets').to.be.an('array');

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
        });

        done();
      })
      .catch((err) => done(err));
  });
});
