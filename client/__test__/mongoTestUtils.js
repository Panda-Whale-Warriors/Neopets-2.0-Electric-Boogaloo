const mongoose = require('mongoose');

const connectToDB = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

const TestModel = mongoose.model(
  'Test',
  new mongoose.Schema({ username: String })
);

const createUser = async (username) => {
  const testUser = new TestModel({ username });
  await testUser.save();
  return testUser;
};

const findUser = async (username) => {
  return TestModel.findOne({ username });
};
//---IN PROGRESS
const createSession = async (userId) => {
  const testSession = new TestModel({});
  await testSession.save();
  return testUser;
};
//---IN PROGRESS
const findSession = async (userId) => {
  return TestModel.findOne({});
};

//---IN PROGRESS
const createPet = async (name, picture, user, userID) => {
  const testPet = new TestModel({});
  await testPet.save();
  return testPet;
};

//---IN PROGRESS
const findPet = async (name) => {
  return TestModel.findOne({});
};

module.exports = {
  connectToDB,
  disconnectDB,
  createUser,
  findUser,
  createSession,
  findSession,
  createPet,
  findPet,
};
