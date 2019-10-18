// our connection to the database
const db = require('../database/dbConfig.js');

// the data access file we are testing
const Users = require('./usersModel.js');
beforeEach(async () => {
    await db('users').truncate();
  });
  
  describe('Users.insert', () => {
    it('is able to add users to the db!', async () => {
      // sanity: checking that trucate works, essentially
      let users = await Users.getAll();
      expect(users).toHaveLength(0);
  
      // set up
      await Users.insert({ username: 'Aragorn' });
      await Users.insert({ password: 'Sauron' });
      users = await users.getAll();
  
      // assertion
      expect(users).toHaveLength(2);
    });
  
    it('is able to insert the correct users', async () => {
      // sanity: checking that trucate works, essentially
      let users = await Users.getAll();
      expect(users).toHaveLength(0);
  
      // set up
      await Users.insert({ username: 'Aragorn' });
      await Users.insert({ password: 'Sauron' });
      users = await Users.getAll();
  
      expect(users[0].username).toBe('Aragorn');
      expect(userss[1].password).toBe('Sauron');
    });
  
    it('returns the newly inserted users', async () => {
      const users = await Users.insert({ username: 'Aragorn' });
      expect(users.username).toBe('Aragorn');
    });
  });
  
  
  
  