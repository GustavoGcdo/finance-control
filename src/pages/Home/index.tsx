import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const Home = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('MyFinances');
  };
  
  const handleNavigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          importantForAutofill="no"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCompleteType="password"
          secureTextEntry
        />

        <RectButton style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </RectButton>

        <View style={styles.divider} />

        <View style={styles.register}>
          <Text style={styles.registerText}>Não tem conta?</Text>
          <RectButton style={styles.registerButton} onPress={handleNavigateToSignup}>
            <Text style={styles.registerButtonText}>Registrar-se</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 28,
  },
  title: {
    fontSize: 18,
    marginBottom: 26,
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat_500Medium',
  },
  input: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#73D762',
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#73D762',
    marginTop: 5,
    padding: 15,
    borderRadius: 3,
    alignSelf: 'flex-end',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 0.9,
    borderColor: '#e6e6e6',
    width: '80%',
    alignSelf: 'center',
  },
  register: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  registerText: {
    fontFamily: 'Montserrat_400Regular',
    paddingVertical: 5,
    fontSize: 16,
  },
  registerButton: {
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 3,
  },
  registerButtonText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#73D762',
  },
});
