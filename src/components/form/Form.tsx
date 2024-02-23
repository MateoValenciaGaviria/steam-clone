import React from 'react';
import { Form as AntForm, Input, InputNumber } from 'antd';
import { FormProps } from './form.types';
import { Button } from '../button';

export const Form = ({
  inputs,
  initialValues,
  onFinish,
  onFinishFailed,
}: FormProps) => {
  return (
    <AntForm
      className={'form'}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {inputs.map((input) => (
        <AntForm.Item
          label={input.label}
          name={input.name}
          rules={input.rules}
          key={input.name}
        >
          {input.valueType === 'password' && <Input.Password />}
          {input.valueType === 'text' && <Input />}
          {input.valueType === 'number' && <InputNumber min={0} />}
        </AntForm.Item>
      ))}

      <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </AntForm.Item>
    </AntForm>
  );
};
