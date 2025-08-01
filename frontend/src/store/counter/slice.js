import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const defaultTimer = 600; // seconds

const counterSliceDefaultState = {
  counterTimer: defaultTimer,
};

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: counterSliceDefaultState,
  reducers: {
    resetTimer: () => ({
      counterTimer: defaultTimer,
    }),
    setTimer: (state, action) => ({
      counterTimer: action.payload,
    }),
  },
});

export const { resetTimer, setTimer } = counterSlice.actions;

export default combineReducers({
  counter: counterSlice.reducer,
});
