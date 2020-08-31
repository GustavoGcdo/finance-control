import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../contexts/auth.context';

const MyFinances = () => {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Minhas finanças</Text>
      <Button
        title="Sair"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default MyFinances;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 28,
  },
});
