import { User } from '@/screens/project-list/search-panel';
import React, { useEffect, useState } from 'react';
import * as auth from '@/auth-provider';
import { http } from '@/utils/http';

type LoginFn = (username: string, password: string) => Promise<void>;

interface AuthContextValue {
  user: User | null;
  login: LoginFn;
  register: LoginFn;
  logout: () => void;
}

type T = { user: User };

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http<T>('me', { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) =>
    auth.login(username, password).then(setUser);
  const register = (username: string, password: string) =>
    auth.register(username, password).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useEffect(() => {
    bootstrapUser().then(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth 必须在 AuthProvider中使用`);
  }
  return context;
};
