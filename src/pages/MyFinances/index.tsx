import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const MyFinances = () => {
  return (
    <View style={styles.container}>
      <Text>Minhas finanças</Text>
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
  
