//import digiReducer from '..client/reducer.js'

describe('digiPets reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      activeUser: null,
      digiPets: [],
      digiCoins: -infinity,
      isLoading: false,
      isLoggedIn: false,
    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(digiReducer(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'frigiPet' };
      expect(digiReducer(state, action)).toBe(state);
    });
  });

  describe('ADD_PET', () => {
    const action = {
      type: 'ADD_PET',
      payload: 'FrankenSquirtle',
    };

    it('adds a pet', () => {
      const { digiPets } = digiReducer(state, action);
      expect(digiPets[0]).toEqual({
        petName: 'FrankenSquirtle',
      });
    });
  });
});
