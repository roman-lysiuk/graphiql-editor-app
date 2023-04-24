import React, { FunctionComponent, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';

const About = lazy(() => import('./About'));

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
  </Routes>
);

export default Router;
