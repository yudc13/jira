import { useAuth } from '@/context/auth-context';
import React from 'react';
import { Form, Input, Button } from 'antd';
import useAsync from '@/hooks/useAsync';

interface LoginProps {
  onError: (error: Error) => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { onError } = props;
  const { login } = useAuth();
  const { run, isLoading } = useAsync();
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    const { username, password } = values;
    try {
      await run(login(username, password));
    } catch (e) {
      onError(e as Error);
    }
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
        <Button loading={isLoading} type="primary" htmlType="submit" block>
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
