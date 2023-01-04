import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  useFonts
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo/build/launch/AppLoading';
import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/auth.context';
import Routes from './src/routes';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    error: '#ff4545',
    primary: '#73D762',
    accent: '#73D762',
  },
};

export default function App() {
  const [fontLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_300Light,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <AuthProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </AuthProvider>
    </>
  );
}
