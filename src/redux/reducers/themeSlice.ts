import { ThemeReducerProps } from '../types/types';
import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: 'DARK' },
  reducers: {
    changeTheme: (state: ThemeReducerProps, action: any) => {
      state.value = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
