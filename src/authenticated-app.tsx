import React from 'react';
import { Button } from 'antd';
import { useAuth } from './context/auth-context';
import ProjectList from './screens/project-list';

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Button onClick={logout} type="primary">
        登出
      </Button>
      <ProjectList />
    </div>
  );
};

export default AuthenticatedApp;
