import { useAuth } from '@/context/auth-context';
import React from 'react';

const Login = () => {
  const { user, login } = useAuth();
  const handleLogin = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login(username, password);
  };
  return (
    <form onSubmit={handleLogin}>
      {user ? `登陆成功， 当前用户:${user.name}` : ''}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <div>
        <button type="submit">登陆</button>
      </div>
    </form>
  );
};

export default Login;
