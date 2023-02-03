import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/auth.context';
import Routes from './routes';
import store from './store';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 13
  },
  palette: {
    type: 'light',
    primary: { main: '#73D762', contrastText: '#ffffff' },
    secondary: { main: '#318023', contrastText: '#ffffff' }
  }
});

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
