import { configureStore } from '@reduxjs/toolkit';
import { projectListSlice } from '@/screens/project-list/project-list.slice';
import authReducer from '@/store/authSlice';

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
