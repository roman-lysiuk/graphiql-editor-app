import React from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Header.module.scss';

export default function Header() {
  return (
    <header>
      <nav className={cl.nav}>
        <ul className={cl.nav__list}>
          <li className={cl.nav__list_item}>
            <NavLink to="/">Main</NavLink>
          </li>
          <li className={cl.nav__list_item}>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
