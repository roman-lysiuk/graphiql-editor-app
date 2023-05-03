import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Tab } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { removeUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../firebase';
import { changeTheme } from '../../store/themeSlice';
import { setOff, setOn } from '../../store/spinnerSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const testLoginHandler = () => {
    logout();
    dispatch(removeUser());
    navigate('/');
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { isDarkMode } = useAppSelector((state) => state.theme);
  const switchTheme = () => {
    dispatch(changeTheme());

    // TODO remove test fnc
    dispatch(setOn());
    setTimeout(() => dispatch(setOff()), 2000);
  };

  return (
    <header>
      <AppBar
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 500,
        }}
        color="inherit"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Tab
                    color="default"
                    label="Main"
                    value="/"
                    to={user.id ? '/main' : '/'}
                    component={NavLink}
                  />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Tab color="default" label="About" value="/sign" to="/" component={NavLink} />
                </MenuItem>
                {/* <MenuItem onClick={handleCloseNavMenu}>
                  <Tab color="default" label="Sign" value="/sign" to="/sign" component={NavLink} />
                </MenuItem> */}
              </Menu>
            </Box>
            <Button variant="contained" color="secondary" onClick={testLoginHandler}>
              {!user.id ? 'login' : 'logout'}
            </Button>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Tab
                color="default"
                label="Main"
                value="/"
                to={user.id ? '/main' : '/'}
                component={NavLink}
              />
              <Tab color="default" label="About" value="/sign" to="/" component={NavLink} />
              {/* <Tab color="default" label="Sign" value="/sign" to="/sign" component={NavLink} /> */}
            </Box>
            <IconButton sx={{ ml: 1 }} onClick={switchTheme} color="inherit">
              {isDarkMode ? <Brightness4 color="inherit" /> : <Brightness7 color="inherit" />}
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
