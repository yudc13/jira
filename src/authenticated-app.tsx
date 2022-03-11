import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { useAuth } from './context/auth-context';
import ProjectList from './screens/project-list';
import Project from '@/screens/project';
import styled from '@emotion/styled';
import { Row } from './components/libs';

import { ReactComponent as Logo } from '@/assets/software-logo.svg';

const AuthenticatedApp = () => {
  return (
    <div>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={'/projects'} element={<ProjectList />} />
            <Route path={'projects/:projectId'} element={Project} />
          </Routes>
        </BrowserRouter>
      </Main>
    </div>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between gap>
      <HeaderLeft gap>
        <Logo width="18rem" color="rgb(38, 132, 255)" />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link">Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Header = styled(Row)`
  height: 6rem;
  box-shadow: 0 2px 27px 0 rgb(0 0 0 / 10%);
`;

const HeaderLeft = styled(Row)`
  padding: 3.2rem;
`;
const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;

export default AuthenticatedApp;
