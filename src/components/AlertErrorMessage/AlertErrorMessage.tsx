import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

type Props = {
  show?: boolean;
  message: string;
  onClose?: () => void;
};

const AlertErrorMessage: FunctionComponent<Props> = ({ message, onClose }) => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (message) {
      setShowError(true);
    }
  }, [message]);

  const handleClose = () => {
    setShowError(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {showError && (
        <View style={styles.errorMessagesContainer}>
          <Text style={styles.errorMessageText}>{message}</Text>
          <View style={styles.btnClose}>
            <Icon name="close" onPress={handleClose} size={16} color="#6b2727" />
          </View>
        </View>
      )}
    </>
  );
};

export default AlertErrorMessage;

const styles = StyleSheet.create({
  errorMessagesContainer: {
    marginVertical: 10,
    backgroundColor: '#ffbaba',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  errorMessageText: {
    color: '#6b2727',
    fontSize: 13,
  },
  btnClose: {
    marginLeft: 8,
  },
});
