import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4700', // Orange
    },
    secondary: {
      //main: '#0e1422', // Blue
     //main:'#101727' //reduce contrast by 15%
     //main:'#3e434e' //reduce contrast by 20%
     //main:'#2a3149', //softer
     //main:'#1a2747',
     main:'#07223d',
     //main:'#1a2745'
    },
    background: {
      default: '#ffffff', // White
    },
  },
  typography: {
    fontFamily: 'LatoWeb,Lato, sans-serif',
    fontSize: 16,// Customize if needed
  },


  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '10px', // Global input font size
          padding: '10px',  // Global input padding
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px', // Global button font size
        },
      },
    },
  },

});

export default theme;
