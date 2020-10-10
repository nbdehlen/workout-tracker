const Role = require('../RoleSchema');

// Run if user roles need to be added
// should have migrations and seed instead

const initial = () => {
  console.log('populating roles');

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: 'super_admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'super_admin' to roles collection");
      });
    }
  });
};

module.exports = initial;
