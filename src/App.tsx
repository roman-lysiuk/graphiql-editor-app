import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Router from './routes/Router';
import './styles/vendors.scss';
import './styles/index.scss';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './GraphQL/apolloClient';

const client = createApolloClient();
const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Router />;
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

export default App;
