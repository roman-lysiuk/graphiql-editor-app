import React from 'react';
import { Link } from 'react-router-dom';
import './styles/vendors.scss';
import Router from './routes';

const App = () => (
  <main>
    <p>App Works!</p>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
    <Router />
  </main>
);

export default App;
