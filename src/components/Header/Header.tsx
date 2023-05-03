import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { removeUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './Header.module.scss';
import { logout } from '../../firebase';

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const testLoginHandler = () => {
    logout();
    dispatch(removeUser());
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
