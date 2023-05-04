import { createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#d4d4d4' },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          ':hover': {
            color: 'black',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, .5)',
        },
      },
    },
  },
});

export default lightTheme;
