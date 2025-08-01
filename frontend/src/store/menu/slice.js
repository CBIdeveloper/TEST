import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const menuSliceDefaultState = {
  menuInstance: null,
};

const menuSlice = createSlice({
  name: 'menuSlice',
  initialState: menuSliceDefaultState,
  reducers: {
    setMenu: (state, action) => ({
      menuInstance: action.payload,
    }),
  },
});

export const { setMenu } = menuSlice.actions;

export default combineReducers({
  menu: menuSlice.reducer,
});
