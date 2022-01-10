import { User } from './screens/project-list/search-panel';

export const AuthToken = '__jira_auth_token__';

export const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(AuthToken);

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(AuthToken, JSON.stringify(user));
  return user;
};

export const login = (username: string, password: string) => {
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

export const register = (username: string, password: string) => {
  fetch(`${apiUrl}/register`, {
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
