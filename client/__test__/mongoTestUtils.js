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

module.exports = {
  connectToDB,
  disconnectDB,
  createUser,
  findUser,
};
