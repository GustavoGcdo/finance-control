import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo/build/launch/AppLoading';
import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth.context';

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
        <Routes />
      </AuthProvider>
    </>
  );
}
