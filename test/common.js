process.env.NODE_ENV = 'test';
process.env.DEBUG = 'false';

// require global constants
require('./globals');

const models = require('../app/models');
const db = require('../app/db');

describe('API TESTS', () => {
  // Clear database before each unit test
  beforeEach(() => {
    dropDatabase().catch((err) => {
      throw err;
    });
  });

  // Those components will be tested in order
  require('./controllers/index.spec.js');
  require('./db/index.spec.js');
  require('./middlewares/index.spec.js');
  require('./models/index.spec.js');
  require('./modules/index.spec.js');
  require('./services/index.spec.js');
  require('./routes/index.spec.js');
  require('./utils/index.spec.js');

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
