import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const tableSelectSliceDefaultState = {
  selectList: [],
};

const tableSelectSlice = createSlice({
  name: 'tableSelectSlice',
  initialState: tableSelectSliceDefaultState,
  reducers: {
    addItemToSelectList: (state, action) => ({
      ...state,
      selectList: [...state.selectList, action.payload],
    }),
    deleteItemFromSelectList: (state, action) => {
      let { selectList } = state;
      selectList = selectList.filter((item) => item !== action.payload);
      return {
        ...state,
        selectList,
      };
    },
    setSelectList: (state, action) => ({
      ...state,
      selectList: action.payload,
    }),
    resetSelectList: (state) => ({
      ...state,
      selectList: [],
    }),
  },
});

export const {
  addItemToSelectList,
  deleteItemFromSelectList,
  setSelectList,
  resetSelectList,
} = tableSelectSlice.actions;

export default combineReducers({
  tableSelect: tableSelectSlice.reducer,
});
