import React from 'react';
import { Button as AntButton } from 'antd';

export const Button = (props) => {
  return (
    <AntButton>{props.children}</AntButton>
  )
}
