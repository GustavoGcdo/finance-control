import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Home = () => {
  const handleLogin = () => {
    console.log('clicou em ');
  };
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>
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

        <View style={styles.button}>
          <Button color="#73D762" title="Entrar" onPress={handleLogin} />
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
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat_500Medium'
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
    marginTop: 10,
    alignSelf: 'flex-end',
    width: '100%',
  },
});
