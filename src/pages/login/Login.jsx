import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form } from '../../components';
import PocketBase from 'pocketbase';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const loginInputs = [
  { label: 'Username', name: 'username', rules: [{ required: true, message: 'Please input your Username' }], valueType: 'text' },
  { label: 'Password', name: 'password', rules: [{ required: true, message: 'Please input your password' }], valueType: 'password' },
];

const signUpInputs = [
  { label: 'Name', name: 'name', rules: [{ required: true, message: 'Please input your first name' }], valueType: 'text' },
  { label: 'Username', name: 'username', rules: [{ required: true, message: 'Please input a username' }], valueType: 'text' },
  { label: 'Email', name: 'email', rules: [{ required: true, message: 'Please input your email' }], valueType: 'text' },
  { label: 'Password', name: 'password', rules: [{ required: true, message: 'Please input a password' }], valueType: 'password' },
  { label: 'Password confirm', name: 'passwordConfirm', rules: [{ required: true, message: 'Please confirm your password' }], valueType: 'password' },
];

export const Login = () => {

  const pb = new PocketBase('http://127.0.0.1:8090');

  const theme = useSelector((state) => state.theme.value);
  const [action, setAction] = useState('login');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

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

  const authUser = async (values) => {
    const authData = await pb.collection('users').authWithPassword(
      values.username,
      values.password,
    );
    if (authData.record) {
      localStorage.setItem('user', JSON.stringify(authData.record));
      notification('success', `Welcome back ${values.username}!`);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } else {
      notification('error', `User not found`);
    }

  }

  const createNewUser = async (values) => {
    const data = values;
    data.emailVisibility = true;
    await pb.collection('users').create(data);
    notification('success', 'Your account has been created!');
    localStorage.setItem('user', JSON.stringify(data));
    setTimeout(() => {
      navigate('/');
    }, 2500);
  }

  const onFinish = (values) => {
    switch (action) {
      case 'login':
        authUser(values);
        break;
      case 'signUp':
        createNewUser(values);
        break;
      default:
        break;
    };
  }

  const onFinishFailed = () => {
    notification('error', `The account could't be created`);
  };

  const handleOnClick = () => {
    switch (action) {
      case 'login':
        setAction('signUp');
        break;
      case 'signUp':
        setAction('login');
        break;
      default:
        break;
    }
  }

  return (
    <>
      {contextHolder}
      <div className={`login login--${theme}`}>
        <div className={'form-container'}>
          <Form inputs={action === 'login' ? loginInputs : signUpInputs} onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
        <Button type='link' onClick={handleOnClick}>{action === 'login' ? 'Create account' : 'Login'}</Button >
      </div>
    </>
  )
}
