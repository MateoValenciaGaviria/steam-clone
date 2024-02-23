import React, { useState } from 'react';
import { NavBar, Button, Form } from '../../components';
import { useSelector } from 'react-redux';
import { useDataBase } from '../../hooks/index';

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
  const { authUser, createNewUser, notification, contextHolder } = useDataBase();
  const theme = useSelector((state) => state.theme.value);
  const [action, setAction] = useState('login');

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
      <NavBar />
      <div className={`login login--${theme}`}>
        <div className={'form-container'}>
          <Form inputs={action === 'login' ? loginInputs : signUpInputs} onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
        <Button type='link' onClick={handleOnClick}>{action === 'login' ? 'Create account' : 'Login'}</Button >
      </div>
    </>
  )
}
