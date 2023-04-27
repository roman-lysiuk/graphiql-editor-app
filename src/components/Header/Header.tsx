import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { setUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './Header.module.scss';
import { addMessage } from '../../store/sysMessengerSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const testLoginHandler = () => {
    if (user.id > 0) {
      dispatch(setUser({ id: 0, login: '', email: '' }));
      dispatch(addMessage({ type: 'info', message: 'user login' }));
    } else {
      dispatch(setUser({ id: 1, login: 'test', email: 'test@test.test' }));
      dispatch(addMessage({ type: 'error', message: 'user logout' }));
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
          <Button variant="contained" color="secondary" onClick={testLoginHandler}>
            {user.id ? 'login' : 'logout'}
          </Button>
        </ul>
      </nav>
    </header>
  );
}
