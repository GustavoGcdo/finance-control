import { MaterialIcons as Icon } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OperationType } from '../../../models/enums/operation-type.enum';
import { Operation } from '../../../models/operation';

type Props = {
  operation: Operation;
};

const OperationItem: React.FC<Props> = ({ operation }) => {
  const getIconByType = (operationType: OperationType) => {
    switch (operationType) {
      case OperationType.EXPENSE:
        return <Icon name="arrow-downward" size={20} color="red" />;

      case OperationType.RECIPE:
        return <Icon name="arrow-upward" size={20} color="#73D762" />;
    }
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString).toLocaleDateString();
    if (date === 'Invalid Date') {
      return '--/--/----';
    }
    return date;
  };

  const formatOperationValue = (value: number, type: OperationType) => {
    const formatedValue = `R$ ${
      type === OperationType.EXPENSE ? '-' : ''
    } ${value}`;
    return formatedValue;
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconOperation}>{getIconByType(operation.type)}</View>
      <View style={styles.info}>
        <Text>{operation.description}</Text>
        {/* <Text>{operation.category}</Text> */}
        <Text>{formatDateString(operation.date)}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{formatOperationValue(operation.value, operation.type)}</Text>
      </View>
    </View>
  );
};

export default OperationItem;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  iconOperation: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: 8,
    flex: 1,
  },
  valueContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
valueText: {
    fontFamily: 'Montserrat_500Medium',    
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',    
    borderRadius: 5
  },
});
