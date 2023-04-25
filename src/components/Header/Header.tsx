import React from 'react';
import { NavLink } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './Header.module.scss';

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const testLoginHandler = () => {
    if (user.id > 0) {
      dispatch(setUser({ id: 0, login: '', email: '' }));
    } else {
      dispatch(setUser({ id: 1, login: 'test', email: 'test@test.test' }));
    }
  };

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
          <button onClick={testLoginHandler}>{user.id ? 'login' : 'logout'}</button>
        </ul>
      </nav>
    </header>
  );
}
