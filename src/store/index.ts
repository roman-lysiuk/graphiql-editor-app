import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import sysMessengerSlice from './sysMessengerSlice';
import graphQLRouteSlice from './graphQLRouteSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    sysMessenger: sysMessengerSlice,
    graphQLRoute: graphQLRouteSlice,
  },
  middleware: [],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
