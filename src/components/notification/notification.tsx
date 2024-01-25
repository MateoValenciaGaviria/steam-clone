import React from 'react';
import { Button, message } from 'antd';
import { NotificationProps } from './notification.types';

export const notification = ({ type, customMessage }: NotificationProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: type,
      content: customMessage,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={success}>Customized style</Button>
    </>
  );
};
