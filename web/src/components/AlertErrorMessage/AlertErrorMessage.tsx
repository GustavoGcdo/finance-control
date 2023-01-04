import Icon from '@material-ui/core/Icon';
import React, { FunctionComponent, useEffect, useState } from 'react';
import './AlertErrorMessage.scss';

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
        <div className="error-messages">
          <span>{message}</span>

          <Icon className="btn-close" onClick={handleClose}>
            close
          </Icon>
        </div>
      )}
    </>
  );
};

export default AlertErrorMessage;
