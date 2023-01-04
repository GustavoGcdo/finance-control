import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth.context';
import { Operation } from '../../models/operation';
import { getOperations } from '../../services/finances.service';
import OperationItem from './OperationItem/OperationItem';

const MyFinances = () => {
  const { signOut } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [operationsList, setOperationsList] = useState<Operation[]>([]);

  useEffect(() => {
    getOperationsList();
  }, []);

  const getOperationsList = async () => {
    try {
      const result = await getOperations();
      setOperationsList(result.data.results);
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Minhas finanças</Text>
        <RectButton style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Sair</Text>
        </RectButton>
      </View>

      <FlatList
        style={styles.operationList}
        data={operationsList}
        keyExtractor={(operation) => operation._id}
        refreshing={isRefreshing}
        onRefresh={() => {
          getOperationsList();
        }}
        renderItem={({ item }) => <OperationItem operation={item} />}
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
  },
  header: {
    paddingTop: 38,
    flexDirection: 'row',
    backgroundColor: '#73D762',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  headerText: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    fontSize: 16,
  },
  signOutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  signOutText: {
    fontFamily: 'Montserrat_500Medium',
    textTransform: 'uppercase',
    color: '#fff',
  },
  operationList: {
    marginTop: 3,
  },
});
