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
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff00',
          fontWeight: '500',
          color: '#1c1c1c',
          border: '3px solid #1c1c1c',
        },
      },
    },
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       border: '2px solid #1c1c1c',
    //     },
    //   },
    // },
  },
});

export default lightTheme;
