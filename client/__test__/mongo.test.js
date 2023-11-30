const {
  createUser,
  findUser,
  connectToDB,
  disconnectDB,
} = require('./mongoTestUtils.js');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let dbServer;

beforeAll(async () => {
  dbServer = await MongoMemoryServer.create();
  const dbUri = dbServer.getUri();
  await connectToDB(dbUri);
});

afterAll(async () => {
  await disconnectDB();
  await dbServer.stop();
});

describe('createUser', () => {
  it('should save a username to the in-memory DB', async () => {
    const document = await createUser('Sam');
    const newUser = await mongoose.model('Test').findById(document._id);

    expect(newUser.username).toBe('Sam');
  });
  it('should find a user by username', async () => {
    const username = 'JohnB';
    await createUser(username);
    const foundUser = await findUser(username);
    expect(foundUser.username).toBe(username);
  });
});
