import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  test: 'test',
};

const petSlice = createSlice({
  name: 'pets',
  initialState: initialState,
  reducers: {
    TEST_TEST: (state, action) => {},
  },
});

export const { TEST_TEST } = petSlice.actions;
export default petSlice.reducer;
