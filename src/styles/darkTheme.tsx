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
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff00',
          color: 'white',
          border: '3px solid white',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '2px solid white',
          backgroundColor: '#ffffff18',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: '3px solid white',
          textDecorationColor: '#ffffff00',
          ':hover': {
            color: '#6495ed',
            border: '3px solid #6495ed',
          },
        },
      },
    },
  },
});

export default darkTheme;
