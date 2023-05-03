import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import sysMessengerSlice from './sysMessengerSlice';
import graphQLSlice from './graphQLSlice';
import themeSlice from './themeSlice';
import multiLangSlice from './multiLangSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    sysMessenger: sysMessengerSlice,
    theme: themeSlice,
    graphQL: graphQLSlice,
    multiLang: multiLangSlice,
  },
  middleware: [],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
