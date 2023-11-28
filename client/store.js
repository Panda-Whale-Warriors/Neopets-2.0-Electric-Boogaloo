import { configureStore } from '@reduxjs/toolkit';
import petSlice from './reducers/petReducer';

const store = configureStore({
  reducer: {
    pet: petSlice,
  },
});

export default store;
