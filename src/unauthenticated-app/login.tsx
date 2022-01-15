import { useAuth } from '@/context/auth-context';
import React from 'react';
import { Form, Input, Button } from 'antd';

const Login = () => {
  const { login } = useAuth();
  const handleLogin = (values: { username: string; password: string }) => {
    const { username, password } = values;
    login(username, password);
  };
  return (
    <Form onFinish={handleLogin}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" type="text" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder="请输入密码" type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
