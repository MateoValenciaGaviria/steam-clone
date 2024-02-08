import React, { useState } from 'react';
import { NavBar, Form } from '../../components';
import { Select } from 'antd';
import PocketBase from 'pocketbase';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const postInputs = [
  { label: 'Name', name: 'name', rules: [{ required: true, message: 'Please input the game name' }], valueType: 'text' },
  { label: 'Description', name: 'description', rules: [{ required: true, message: 'Please input the game description' }], valueType: 'text' },
  { label: 'Price', name: 'price', rules: [{ required: true, message: 'Please input the game price' }], valueType: 'number' },
  { label: 'InStock', name: 'inStock', rules: [{ required: true, message: 'Please input the game stock' }], valueType: 'number' },
  { label: 'Image', name: 'image', rules: [{ required: true, message: 'Please input the game image url' }], valueType: 'text' },
];

const putInputs = [
  { label: 'Name', name: 'name', rules: [{ required: false, message: 'Please input the game name' }], valueType: 'text' },
  { label: 'Description', name: 'description', rules: [{ required: false, message: 'Please input the game description' }], valueType: 'text' },
  { label: 'Price', name: 'price', rules: [{ required: false, message: 'Please input the game price' }], valueType: 'number' },
  { label: 'InStock', name: 'inStock', rules: [{ required: false, message: 'Please input the game stock' }], valueType: 'number' },
  { label: 'Image', name: 'image', rules: [{ required: false, message: 'Please input the game image url' }], valueType: 'text' },
];

const deleteInputs = [];

const postInitialValues = { price: 0, inStock: 0 };
const putInitialValues = { name: 'something' };
const deleteInitialValues = {};

export const Admin = () => {

  const pb = new PocketBase('http://127.0.0.1:8090');
  const theme = useSelector((state) => state.theme.value);

  const [formProps, setFormProps] = useState({ inputs: postInputs, initialValues: postInitialValues });
  const [action, setAction] = useState('post');

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

  const handleChange = (value) => {
    setAction(value);
    switch (value) {
      case 'post':
        setFormProps({ inputs: postInputs, initialValues: postInitialValues });
        break;
      case 'put':
        setFormProps({ inputs: putInputs, initialValues: putInitialValues });
        break;
      case 'delete':
        setFormProps({ inputs: deleteInputs, initialValues: deleteInitialValues });
        break;
      default:
        break;
    }
  };

  const postNewGame = async (values) => {
    const data = values;
    await pb.collection('games').create(data);
    notification('success', 'The game was published!');
  }

  const onFinish = (values) => {
    switch (action) {
      case 'post':
        postNewGame(values);
        break;
      case 'put':
        console.log(values);
        break;
      case 'delete':

        break;
      default:
        break;
    };
  }

  const onFinishFailed = () => {
    notification('error', `The game could't be published`);
  };

  return (
    <>
      {contextHolder}
      <NavBar />
      <div className={`admin admin--${theme}`}>
        <div className={'form-container'}>
          <div className={'admin-select'}>
            <Select
              defaultValue={action}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'post', label: 'Post Game' },
                { value: 'put', label: 'Edit Game' },
                { value: 'delete', label: 'Delete Game', disabled: true },
              ]}
            />
          </div>
          <Form inputs={formProps.inputs} initialValues={formProps.initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
      </div>
    </>
  )
}
