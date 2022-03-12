import { useAuth } from '@/context/auth-context';
import qs from 'qs';
import { apiUrl, logout } from '@/auth-provider';
import { useCallback } from 'react';

interface Config extends RequestInit {
  token?: string;
  data?: Object;
}

export const http = async <T>(
  url: string,
  { data, token, headers, ...customConfig }: Config
): Promise<T> => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };
  if (config.method.toLocaleUpperCase() === 'GET') {
    url += `?${qs.stringify(data || {})}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject({ message: '请重新登陆' });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    <T>(...[url, config]: Parameters<typeof http>): Promise<T> =>
      http(url, { ...config, token: user?.token }),
    [user?.token]
  );
};
