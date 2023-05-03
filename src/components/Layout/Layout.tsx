import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SysMessenger from '../SysMessenger/SysMessenger';
import lightTheme from '../../styles/lightTheme';
import darkTheme from '../../styles/darkTheme';
import Spinner from '../Spinner/Spinner';
import { useAppSelector } from '../../hooks/redux';

export default function Layout() {
  const { isDarkMode } = useAppSelector((state) => state.theme);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
      <Spinner />
      <SysMessenger />
    </ThemeProvider>
  );
}
