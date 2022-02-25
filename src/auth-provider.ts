import { User } from './screens/project-list/search-panel';

export const AuthTokenKey = '__jira_auth_token__';

export const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(AuthTokenKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(AuthTokenKey, user.token);
  return user;
};

export const login = (username: string, password: string) => {
  return fetch(`${apiUrl}/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
    return Promise.reject(await response.json());
  });
};

export const register = (username: string, password: string) => {
  return fetch(`${apiUrl}/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
    return Promise.reject(await response.json());
  });
};

export const logout = async () => window.localStorage.removeItem(AuthTokenKey);
