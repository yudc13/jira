import { useAuth } from '@/context/auth-context';
import React from 'react';

const Register = () => {
  const { register } = useAuth();
  const handleRegister = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    register(username, password);
  };
  return (
    <form onSubmit={handleRegister}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <div>
        <button type="submit">注册</button>
      </div>
    </form>
  );
};

export default Register;
