const Pet = require('../model/petModel');
const User = require('../model/userModel');

const petController = {};

// retrieve all pets information when we go to /pets

petController.getPets = async (req, res, next) => {
  const { ssid } = req.cookies;

  try {
    const foundPets = await Pet.find({ ownerId: ssid }); // this will return an array of pet objects
    res.locals.getPets = foundPets;
    console.log('Logging all found pets by userID', ssid);
    console.log(foundPets);
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught error in petController.getPets middleware',
      status: 500,
      message: { err: 'Unable to pull pet data from database' },
    });
  }
};

/* OLD PET FIND ROUTE*/
//   Pet.find({})
//     .then((pets) => {
//       res.locals.getPets = pets;
//       console.log(res.locals.getPets);
//       return next();
//     })
//     .catch((error) => {
//       console.log('Error in getting pets', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     });
// };

// get one pet by id
petController.getOnePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('id---->', id);
    const pet = await Pet.findById(id);

    console.log('pet-->>', pet);
    res.locals.getOnePet = pet;
    return next();
  } catch (err) {
    return next({
      log: 'Express terror handler caught error in petController.getOnePet middleware',
      status: 500,
      message: { err: 'Unable to pull pet data from database' },
    });
  }
};

// post a pet info
// ------ WE COULD CHECK THE DATE HERE, AND STORE IT ON THE PET DATA---------
// ------ A future function will do maff-automatics to calculate minutes/hours of life
/* const birthday = new Date -- add to pets */
petController.postPet = async (req, res, next) => {
  //How do we retrieve the active user, and set owner to be the property
  console.log('REQ.BODY: ', req.body);
  const { name, picture } = req.body;
  const { ssid } = req.cookies;
  console.log('name: ', name);
  console.log('picture: ', picture);
  try {
    const owner = await User.findOne({ _id: ssid });
    console.log('--------made it to postPet-------');
    console.log('name: ', name, 'picture: ', picture);
    const pets = await Pet.create({
      name: name,
      picture: picture,
      ownerId: owner._id,
      owner: owner.username,
    });
    console.log('we created something!!!!!!');
    res.locals.postPets = pets;

    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught error in petController.postPet middleware',
      status: 500,
      message: { err: 'Unable to add pet to database' },
    });
  }
};

//update a pet info
// thirst, hunger, age, and life
// ------- Part Two Check the current Date in this function to determine the difference between "birthday", and now to update age------
/* const currentDate = new Date.getTime()
   const birth = req.params.birthday.getTime()
   req.body.age = 
*/
petController.updatePet = (req, res, next) => {
  const { thirst, hunger, age, life, owner, ownerId } = req.body;
  const { id } = req.params;

  // find the certain pet with the id and update
  // using findByIdAndUpdate method
  Pet.findByIdAndUpdate(
    id,
    { thirst, hunger, age, life, owner, ownerId },
    { new: true }
  )
    .then((pets) => {
      res.locals.updatePet = pets;
      console.log('is this hitting updatePet?');
      return next();
    })
    .catch((error) => {
      console.log('Error in updating pets:', error);
      return res.status(500).json({ error: 'Internet Server Error' });
    });
};

//Delete(release) a pet
petController.releasePet = (req, res, next) => {
  const { id } = req.params;

  Pet.findOneAndDelete({ _id: id })
    .then((pet) => {
      res.locals.releasePet = pet;
      return next();
    })
    .catch((error) => {
      console.log('Error in releasing a pet:', error);
      return res.status(500).json({ error: 'Internet Server Error' });
    });
};

petController.releaseAll = (req, res, next) => {
  Pet.deleteMany()
    .then(() => {
      console.log('Released all pets');
      res.status(200).json();
    })
    .catch((error) => {
      console.log('Error in releasing all pets:', error);
      return res.status(500).json({ error: 'Internet Server Error' });
    });
};
module.exports = petController;
