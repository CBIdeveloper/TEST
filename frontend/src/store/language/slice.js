import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import english from '../../assets/i18n/english.json';
import traditionalChinese from '../../assets/i18n/traditionalChinese.json';
import simplifiedChinese from '../../assets/i18n/simplifiedChinese.json';

const languageSliceDefaultState = {
  languageName: 'traditionalChinese',
  languageObject: traditionalChinese,
};

const translateObject = {
  english,
  traditionalChinese,
  simplifiedChinese,
};

const languageSlice = createSlice({
  name: 'languageSlice',
  initialState: languageSliceDefaultState,
  reducers: {
    switchLanguage: (state, action) => {
      const selectedLanguage = action.payload;
      return {
        languageName: selectedLanguage,
        languageObject: translateObject[selectedLanguage],
      };
    },
  },
});

export const { switchLanguage } = languageSlice.actions;

export default combineReducers({
  languageInfo: languageSlice.reducer,
});
