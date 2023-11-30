const Pet = require('../model/petModel');

const petController = {};

// retrieve all pets information when we go to /pets

petController.getPets = (req, res, next) => {
  Pet.find({})
    .then((pets) => {
      res.locals.getPets = pets;
      console.log(res.locals.getPets);
      return next();
    })
    .catch((error) => {
      console.log('Error in getting pets', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};

// get one pet by id
petController.getOnePet = (req, res, next) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => {
      res.locals.getOnePet = pet;
      return next();
    })
    .catch((error) => {
      console.error('Error in getting one pet', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};

// post a pet info
// ------ WE COULD CHECK THE DATE HERE, AND STORE IT ON THE PET DATA---------
// ------ A future function will do maff-automatics to calculate minutes/hours of life
/* const birthday = new Date -- add to pets */
petController.postPet = (req, res, next) => {
  const { name, picture } = req.body;
  console.log('--------made it to postPet-------');
  Pet.create({ name, picture })
    .then((pets) => {
      res.locals.postPets = pets;
      console.log('new pet: ', pets);
      return next();
    })
    .catch((error) => {
      console.log('Error in posting pets:', error);
      return res.status(500).json({ error: 'Internet Server Error' });
    });
};

//update a pet info
// thirst, hunger, age, and life
// ------- Part Two Check the current Date in this function to determine the difference between "birthday", and now to update age------
/* const currentDate = new Date.getTime()
   const birth = req.params.birthday.getTime()
   req.body.age = 
*/
petController.updatePet = (req, res, next) => {
  const { thirst, hunger, age, life } = req.body;
  const { id } = req.params;

  // find the certain pet with the id and update
  // using findByIdAndUpdate method
  Pet.findByIdAndUpdate(id, { thirst, hunger, age, life }, { new: true })
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
