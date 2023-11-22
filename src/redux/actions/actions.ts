import { ThemeType, CHANGETHEME } from '../types/types';

export const changeTheme = (theme: ThemeType) => {
  return {
    type: CHANGETHEME,
    payload: theme,
  };
};
