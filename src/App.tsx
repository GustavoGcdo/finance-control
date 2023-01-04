import React from 'react';
import { AuthProvider } from './contexts/auth.context';
import Routes from './routes';
import './App.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  palette: {
    type: 'light',
    primary: { main: '#73D762', contrastText: '#ffffff' },
    secondary: { main: '#318023', contrastText: '#ffffff' },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
