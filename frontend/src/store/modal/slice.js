import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const dialogModalSliceDefaultState = {
  isModalOpen: false,
  modalObject: null,
  modalObjectStack: [],
};

const dialogModalSlice = createSlice({
  name: 'dialogModalSlice',
  initialState: dialogModalSliceDefaultState,
  reducers: {
    openDialogModal: (state, action) => ({
      ...state,
      isModalOpen: true,
      modalObject: action.payload,
    }),
    closeDialogModal: (state) => ({
      ...state,
      isModalOpen: false,
      modalObject: null,
      modalObjectStack: [],
    }),
    reserveOpenDialogModal: (state, action) => {
      const modalObjectStack =
        state.modalObject === null
          ? [...state.modalObjectStack]
          : [...state.modalObjectStack, state.modalObject];
      return {
        ...state,
        modalObjectStack,
        isModalOpen: true,
        modalObject: action.payload,
      };
    },
    reserveCloseDialogModal: (state) => {
      let isModalOpen = false;
      let modalObject = null;
      const modalObjectStack = [...state.modalObjectStack];
      if (state.modalObjectStack.length !== 0) {
        isModalOpen = true;
        modalObject = modalObjectStack.pop();
      }
      return {
        ...state,
        modalObjectStack,
        isModalOpen,
        modalObject,
      };
    },
  },
});

export const {
  openDialogModal,
  closeDialogModal,
  reserveOpenDialogModal,
  reserveCloseDialogModal,
} = dialogModalSlice.actions;

export default combineReducers({
  dialogModal: dialogModalSlice.reducer,
});
