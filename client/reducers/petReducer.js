import { createSlice } from '@reduxjs/toolkit';

const getInitialState = async () => {
  //array of objects, object has all properites in pet model
  const response = await fetch('/create/pets');
  const result = await response.json();
  console.log(result);
  const initialState = {
    petIndexList: [],
    petDirectionList: [],
    petColorList: [],
  };

  const directionArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  for (let pet of result) {
    initialState.petIndexList.push([150, 150]);
    initialState.petDirectionList.push(
      directionArray[Math.floor(Math.random() * directionArray.length)]
    );
    initialState.petColorList.push(pet.picture);
  }
  console.log('initialState: ', initialState);
  console.log('indexList: ', initialState.petIndexList);
  return initialState;
};

// const initialState = getInitialState();
const initialState = {
  petIndexList: [],
  petDirectionList: [],
  petColorList: [],
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
    POPULATE_SCREEN: (state, action) => {
      const result = action.payload;
      console.log(action.payload);
      const directionArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

      let copyPetIndexList = state.petIndexList;
      let copyPetDirectionList = state.petDirectionList;
      let copyPetColorList = state.petColorList;

      for (let pet of result) {
        copyPetIndexList.push([150, 150]);
        copyPetDirectionList.push(
          directionArray[Math.floor(Math.random() * directionArray.length)]
        );
        copyPetColorList.push(pet.picture);
      }
      state.petIndexList = copyPetIndexList;
      state.petDirectionList = copyPetDirectionList;
      state.petColorList = copyPetColorList;
    },
  },
});

export const { PET_MOVE, CHANGE_DIRECTION, CHOOSE_NEW_PET, POPULATE_SCREEN } =
  petSlice.actions;
export default petSlice.reducer;
