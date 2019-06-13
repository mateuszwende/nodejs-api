process.env.NODE_ENV = 'test';
process.env.DEBUG = 'false';

require('./globals');

const models = require('../app/models');
const db = require('../app/db');

describe('API TESTS', () => {
  beforeEach(() => {
    dropDatabase().catch((err) => {
      throw err;
    });
  });

  require('./db/index.spec.js');
  require('./models/index.spec.js');
  require('./services/index.spec.js');
  require('./controllers/index.spec.js');
  require('./routes/index.spec.js');

  after(() => {
    db.close().catch((err) => {
      throw err;
    });
    console.log('ALL TESTS ARE DONE.');
  });
});

async function dropDatabase() {
  Object.keys(models).map(async (key) => {
    await models[key].deleteMany({});
  });
}
