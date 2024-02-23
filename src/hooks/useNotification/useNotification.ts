import { message } from 'antd';

export const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const notification = (type, customMessage) => {
    messageApi.open({
      type: type,
      content: customMessage,
      className: 'custom-class',
      duration: 10,
      style: {
        marginTop: '20px',
      },
    });
  };

  return {
    notification,
    contextHolder,
  };
};
