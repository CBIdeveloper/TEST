import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const querySliceDefaultState = {
  queryObject: {},
};

const querySlice = createSlice({
  name: 'querySlice',
  initialState: querySliceDefaultState,
  reducers: {
    setQueryObject: (state, action) => ({
      queryObject: action.payload,
    }),
  },
});

export const { setQueryObject } = querySlice.actions;

export default combineReducers({
  query: querySlice.reducer,
});
