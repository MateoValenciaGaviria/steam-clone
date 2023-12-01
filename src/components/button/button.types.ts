import { ReactNode } from 'react';

type SizeType = 'small' | 'middle' | 'large' | undefined;
export interface ButtonProps {
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  icon?: ReactNode;
  onClick?: VoidFunction;
  size?: SizeType;
  href?: string;
}
