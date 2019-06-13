const mongoose = require('mongoose');
const db = require('../../app/db');

describe('DATABASE', () => {
  beforeEach(async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await db.close();
      }
    } catch (err) {
      throw err;
    }
  });

  after(async () => {
    try {
      if (mongoose.connection.readyState === 3) {
        await db.connect();
      }
    } catch (err) {
      throw err;
    }
  });

  it('it should connect to database', async () => {
    try {
      const client = await db.connect();

      client.connection.readyState.should.be.eql(1);
    } catch (err) {
      throw err;
    }
  });

  it('it should close connection to database', async () => {
    try {
      await db.close();

      mongoose.connection.readyState.should.be.eql(0);
    } catch (err) {
      throw err;
    }
  });

  it('it should confirm that the database is connected', async () => {
    try {
      await db.connect();

      db.isConnected().should.be.eql(true);
    } catch (err) {
      throw err;
    }
  });
});
