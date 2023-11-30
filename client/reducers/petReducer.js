import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  petIndexList: [[150, 150]],
  petDirectionList: ['SE'],
  petColorList: ['purple'],
};

const petSlice = createSlice({
  name: 'pets',
  initialState: initialState,
  reducers: {
    PET_MOVE: (state, action) => {
      const copy = [...state.petIndexList];
      for (let i = 0; i < state.petIndexList.length; i++) {
        if (state.petDirectionList[i] === 'N') {
          copy[i][1] -= 10;
        }
        if (state.petDirectionList[i] === 'NE') {
          copy[i][0] += 10;
          copy[i][1] -= 10;
        }
        if (state.petDirectionList[i] === 'E') {
          copy[i][0] += 10;
        }
        if (state.petDirectionList[i] === 'SE') {
          copy[i][0] += 10;
          copy[i][1] += 10;
        }
        if (state.petDirectionList[i] === 'S') {
          copy[i][1] += 10;
        }
        if (state.petDirectionList[i] === 'SW') {
          copy[i][0] -= 10;
          copy[i][1] += 10;
        }
        if (state.petDirectionList[i] === 'W') {
          copy[i][0] -= 10;
        }
        if (state.petDirectionList[i] === 'NW') {
          copy[i][0] -= 10;
          copy[i][1] -= 10;
        }
      }

      state.petIndexList = copy;
    },
    CHANGE_DIRECTION: (state, action) => {
      console.log('changing direction');
      const index = action.payload;
      const copy = [...state.petDirectionList];
      let directionArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      //max right
      if (state.petIndexList[index][0] > 1000) {
        //bottom right corner
        if (state.petIndexList[index][1] > 650) {
          directionArray = ['N', 'NW', 'W'];
          //top right corner
        } else if (state.petIndexList[index][1] < 150) {
          directionArray = ['W', 'S', 'SW'];
          //right
        } else {
          directionArray = ['N', 'S', 'SW', 'W', 'NW'];
        }
      }
      //max left
      if (state.petIndexList[index][0] < 150) {
        //bottom left
        if (state.petIndexList[index][1] > 650) {
          directionArray = ['N', 'NE', 'E'];
          //top left
        } else if (state.petIndexList[index][1] < 150) {
          directionArray = ['E', 'S', 'SE'];
          //left edge
        } else {
          directionArray = ['N', 'NE', 'E', 'SE', 'S'];
        }
      }
      //top
      if (state.petIndexList[index][1] < 150) {
        directionArray = ['E', 'SE', 'S', 'SW', 'W'];
      }

      if (state.petIndexList[index][1] > 650) {
        directionArray = ['E', 'NE', 'N', 'NW', 'W'];
      }
      copy[index] =
        directionArray[Math.floor(Math.random() * directionArray.length)];
      state.petDirectionList = copy;
    },
    CHOOSE_NEW_PET: (state, action) => {
      const directionArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const colorChoice = action.payload;
      const colorListCopy = [...state.petColorList];
      colorListCopy.push(colorChoice);
      const petIndexListCopy = [...state.petIndexList];
      petIndexListCopy.push([150, 150]);
      const directionListCopy = [...state.petDirectionList];
      directionListCopy.push(
        directionArray[Math.floor(Math.random() * directionArray.length)]
      );
      state.petColorList = colorListCopy;
      state.petIndexList = petIndexListCopy;
      state.petDirectionList = directionListCopy;
    },
  },
});

export const { PET_MOVE, CHANGE_DIRECTION, CHOOSE_NEW_PET } = petSlice.actions;
export default petSlice.reducer;
