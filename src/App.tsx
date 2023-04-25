import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Router from './routes/Router';
import './styles/vendors.scss';
import './styles/index.scss';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router />;
    </BrowserRouter>
  </Provider>
);

export default App;
