export const CHANGETHEME = 'CHANGETHEME';

export type ThemeType = 'LIGHT' | 'DARK';

export interface ThemeReducerProps {
  value: ThemeType;
}
