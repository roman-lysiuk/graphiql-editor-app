import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Router from './routes/Router';
import apolloClient from './GraphQL/apolloClient';
import store from './store';
import './styles/vendors.scss';
import './styles/index.scss';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

export default App;
