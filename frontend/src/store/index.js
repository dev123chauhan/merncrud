import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import teamReducer from './teamSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    team: teamReducer,
  },
});