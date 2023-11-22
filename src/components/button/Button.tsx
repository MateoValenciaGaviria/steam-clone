import React, { PropsWithChildren } from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from './button.types';
import { useSelector } from 'react-redux';

export const Button = ({
  type,
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  const theme = useSelector((state: any) => state.theme.value);

  return (
    <AntButton className={`${type}--${theme}`} type={type} onClick={onClick}>
      {children}
    </AntButton>
  );
};

export default Button;
