import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/screens/project-list/search-panel';
import * as auth from '@/auth-provider';
import { AppDispatch, RootState } from '@/store/index';
import { bootstrapUser } from '@/context/auth-context';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.auth.user;

export const { setUser } = authSlice.actions;
// thunk
export const login =
  (username: string, password: string) => (dispatch: AppDispatch) =>
    auth.login(username, password).then((user) => dispatch(setUser(user)));

export const register =
  (username: string, password: string) => (dispatch: AppDispatch) =>
    auth.register(username, password).then((user) => dispatch(setUser(user)));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));

export default authSlice.reducer;
