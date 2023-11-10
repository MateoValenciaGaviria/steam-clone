import React, { PropsWithChildren } from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from './button.types';

export const Button = ({ type, children }: PropsWithChildren<ButtonProps>) => {
  return <AntButton type={type}>{children}</AntButton>;
};

export default Button;
