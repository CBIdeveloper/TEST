import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const braidingSliceDefaultState = {
  braidingList: null,
};

const braidingSlice = createSlice({
  name: 'braidingSlice',
  initialState: braidingSliceDefaultState,
  reducers: {
    setBraidingList: (state, action) => ({
      braidingList: action.payload,
    }),
  },
});

export const { setBraidingList } = braidingSlice.actions;

export default combineReducers({
  braiding: braidingSlice.reducer,
});
