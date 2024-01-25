import React, { PropsWithChildren } from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from './button.types';
import { useSelector } from 'react-redux';

export const Button = ({
  type,
  children,
  icon,
  href,
  size,
  onClick,
  htmlType,
}: PropsWithChildren<ButtonProps>) => {
  const theme = useSelector((state: any) => state.theme.value);

  return (
    <AntButton
      className={`${type}--${theme}`}
      type={type}
      onClick={onClick}
      icon={icon}
      href={href}
      size={size}
      htmlType={htmlType}
    >
      {children}
    </AntButton>
  );
};

export default Button;
