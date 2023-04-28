import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import sysMessengerSlice from './sysMessengerSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    sysMessenger: sysMessengerSlice,
  },
  middleware: [],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
