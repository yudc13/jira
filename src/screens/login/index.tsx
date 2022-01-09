import React from 'react';

const apiUrl = process.env.REACT_APP_URL;

const Login = () => {
  const login = (username: string, password: string) => {
    fetch(`${apiUrl}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
  };
  const handleLogin = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login(username, password);
  };
  return (
    <form onSubmit={handleLogin}>
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
