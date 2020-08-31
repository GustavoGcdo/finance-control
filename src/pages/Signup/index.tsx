import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{padding:10, marginVertical: 20, backgroundColor: 'gray'}} onPress={handleNavigateBack}>
        <Text>Voltar</Text>
      </TouchableOpacity>

      <Text>Signup</Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 28,
  },
});
