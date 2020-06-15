const largePost = {
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
      bogusData: 'Could be Anything',
    },
  ],
};

const smallPost = {
  type: 'Strength',
  start: '2020-04-12T20:50:40.000Z',
  end: '2020-04-14T11:50:40.000Z',
};

const missingDataPost = {
  type: 'Run',
  end: '2019-04-12T21:41:29.000Z',
};


module.exports = {
  largePost, smallPost, missingDataPost,
};
