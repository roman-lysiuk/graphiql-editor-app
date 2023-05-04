import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: 'rgb(30,30,30)' },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          ':hover': {
            color: 'white',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(100, 100, 100, .5)',
        },
      },
    },
  },
});

export default darkTheme;
