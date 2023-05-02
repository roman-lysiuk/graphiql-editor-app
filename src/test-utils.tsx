/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */

import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { ApolloProvider } from '@apollo/client';
import store from './store';
// import apolloClient from './GraphQL/apolloClient';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  // <ApolloProvider client={apolloClient}>
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
  // </ApolloProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
