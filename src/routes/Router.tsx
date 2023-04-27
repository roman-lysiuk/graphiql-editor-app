import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

import ErrorPage from './ErrorPage/ErrorPage';
import Main from './Main/Main';
import Layout from '../components/Layout/Layout';
import WelcomePage from './Welcome/Welcome';

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="about" element={<WelcomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default Router;
