import { User } from '@/screens/project-list/search-panel';
import React, { useCallback, useEffect } from 'react';
import * as auth from '@/auth-provider';
import * as authStore from '@/store/authSlice';
import { http } from '@/utils/http';
import useAsync from '@/hooks/useAsync';
import { FullErrorPage, FullLoadingPage } from '@/components/libs';
import { useDispatch, useSelector } from 'react-redux';
import { bootstrap, selectUser } from '@/store/authSlice';

type T = { user: User };

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http<T>('me', { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { run, isLoading, isError, error, isIdle } = useAsync<User | null>();
  const dispatch = useDispatch<(...args: unknown[]) => Promise<User>>();

  useEffect(() => {
    run(dispatch(bootstrap()));
  }, [run, dispatch]);

  if (isIdle || isLoading) {
    return <FullLoadingPage />;
  }

  if (isError) {
    return <FullErrorPage error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch = useDispatch<(...args: unknown[]) => Promise<User>>();
  const user = useSelector(selectUser);
  const login = useCallback(
    (username: string, password: string) =>
      dispatch(authStore.login(username, password)),
    [dispatch]
  );
  const register = useCallback(
    (username: string, password: string) =>
      dispatch(authStore.register(username, password)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    login,
    register,
    logout,
    user,
  };
};
