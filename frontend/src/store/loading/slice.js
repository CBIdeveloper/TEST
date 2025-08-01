import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const loadingSliceDefaultState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: loadingSliceDefaultState,
  reducers: {
    setLoading: (state, action) => ({
      isLoading: action.payload,
    }),
  },
});

export const { setLoading } = loadingSlice.actions;

export default combineReducers({
  loading: loadingSlice.reducer,
});
