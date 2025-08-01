import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const notificationSliceDefaultState = {
  notificationList: false,
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: notificationSliceDefaultState,
  reducers: {
    setNotificationList: (state, action) => ({
      notificationList: action.payload,
    }),
  },
});

export const { setNotificationList } = notificationSlice.actions;

export default combineReducers({
  notification: notificationSlice.reducer,
});
