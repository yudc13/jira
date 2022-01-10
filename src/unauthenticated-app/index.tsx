import { useState } from 'react';
import Login from './login';
import Register from './register';

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <>
      {isRegister ? <Login /> : <Register />}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? '去注册' : '去登陆'}
      </button>
    </>
  );
};

export default UnauthenticatedApp;
