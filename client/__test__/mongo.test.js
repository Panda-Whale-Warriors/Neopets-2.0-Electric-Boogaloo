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

describe('createSession', () => {
  it('should have a session created matching the logged in user info', async () => {
    const username = 'Matthew';
    // session creation requires an active user
    await createUser(username);
    const foundUser = await findUser(username);
    await createSession({ cookieId: foundUser._id });
    const foundSession = await findSession({ cookieId: foundUser._id });
    // the session id was created using the user id as its value
    expect(foundUser._id).toBe(foundSession.cookieId);
    expect(typeof foundSession).toEqual(typeof {});
    expect(typeof foundSession._id).toEqual(typeof 'a');
    expect(typeof foundSession.cookieId).toEqual(typeof 'a');
  });
});

describe('createPet', () => {
  it('should have a pet returned with all necessary fields', async () => {
    const username = 'Don';
    //pet creation requires a user to be built off of
    await createUser(username);
    const foundUser = await findUser({ username });
    await createPet({
      name: bob,
      owner: foundUser.username,
      ownerId: foundUser.username,
    });
    const currentPet = findPet({ name: bob });

    expect(typeof currentPet).toEqual(typeof {});
    expect(currentPet.name).toBe('Bob');
    expect(typeof currentPet.name).toEqual(typeof 'a');
    //defaults work
    expect(currentPet.hunger).toBe(50);
    expect(typeof currentPet.hunger).toEqual(typeof 1);
    expect(currentPet.owner).toBe(foundUser.username);
    expect(typeof currentPet.owner).toBe(typeof 'a');
    expect(currentPet.ownerId).toBe(foundUser._id);
    expect(typeof currentPet.ownerId).toEqual(typeof 'a');
  });
});

describe('deleteSession', () => {
  it('should have a session created then deleted once the logout call is made', async () => {
    const username = 'MatthTWO';
    // session creation requires an active user
    await createUser(username);
    const foundUser = await findUser(username);
    await createSession({ cookieId: foundUser._id });
    const foundSession = await findSession({ cookieId: foundUser._id });
    // the session id was created using the user id as its value
    expect(foundSession);
    //REQUIRES A MONGO TEST UNTIL TO CHECK IF FOUND SESSION NO LONGER EXIST
  });
});
