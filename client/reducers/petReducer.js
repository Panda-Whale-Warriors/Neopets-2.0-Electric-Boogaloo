import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  petIndex: [150, 150],
  petDirection: 'SE',
};

const petSlice = createSlice({
  name: 'pets',
  initialState: initialState,
  reducers: {
    PET_MOVE: (state, action) => {
      const copy = [...state.petIndex];
      if (state.petDirection === 'N') {
        copy[1] -= 10;
      }
      if (state.petDirection === 'NE') {
        copy[0] += 10;
        copy[1] -= 10;
      }
      if (state.petDirection === 'E') {
        copy[0] += 10;
      }
      if (state.petDirection === 'SE') {
        copy[0] += 10;
        copy[1] += 10;
      }
      if (state.petDirection === 'S') {
        copy[1] += 10;
      }
      if (state.petDirection === 'SW') {
        copy[0] -= 10;
        copy[1] += 10;
      }
      if (state.petDirection === 'W') {
        copy[0] -= 10;
      }
      if (state.petDirection === 'NW') {
        copy[0] -= 10;
        copy[1] -= 10;
      }
      state.petIndex = copy;
      console.log('position', state.petIndex);
    },
    CHANGE_DIRECTION: (state, action) => {
      let directionArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      //max right
      if (state.petIndex[0] > 1000) {
        //bottom right corner
        if (state.petIndex[1] > 650) {
          directionArray = ['N', 'NW', 'W'];
          //top right corner
        } else if (state.petIndex[1] < 150) {
          directionArray = ['W', 'S', 'SW'];
          //right
        } else {
          directionArray = ['N', 'S', 'SW', 'W', 'NW'];
        }
      }
      //max left
      if (state.petIndex[0] < 150) {
        //bottom left
        if (state.petIndex[1] > 650) {
          directionArray = ['N', 'NE', 'E'];
          //top left
        } else if (state.petIndex[1] < 150) {
          directionArray = ['E', 'S', 'SE'];
          //left edge
        } else {
          directionArray = ['N', 'NE', 'E', 'SE', 'S'];
        }
      }
      //top
      if (state.petIndex[1] < 150) {
        directionArray = ['E', 'SE', 'S', 'SW', 'W'];
      }

      if (state.petIndex[1] > 650) {
        directionArray = ['E', 'NE', 'N', 'NW', 'W'];
      }
      state.petDirection =
        directionArray[Math.floor(Math.random() * directionArray.length)];
      console.log(state.petDirection);
    },
  },
});

export const { PET_MOVE, CHANGE_DIRECTION } = petSlice.actions;
export default petSlice.reducer;
