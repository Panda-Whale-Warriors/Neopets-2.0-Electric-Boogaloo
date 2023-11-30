const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  /* const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
});*/
  hunger: {
    type: Number,
    default: 50,
  },

  thirst: {
    type: Number,
    default: 50,
  },

  happiness: {
    type: Number,
    default: 50,
  },

  birthday: {
    type: Object,
    default: new Date(),
  },

  life: {
    type: Boolean,
    default: true,
  },

  age: {
    type: Number,
    default: 0,
  },

  picture: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
    default: 'DonUnOfficial',
  },
  ownerId: {
    type: String,
    default: '656776ced19a94d043a39c78',
  },
});

const Pet = mongoose.model('pets', petSchema);
module.exports = Pet;
