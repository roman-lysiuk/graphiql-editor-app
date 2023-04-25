import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
