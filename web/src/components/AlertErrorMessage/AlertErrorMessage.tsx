import Icon from '@material-ui/core/Icon';
import { FunctionComponent, useEffect, useState } from 'react';

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
        <div className="my-2 bg-red-300 text-red-900 text-sm p-2 rounded flex items-center justify-between flex-wrap">
          <span>{message}</span>

          <Icon className="cursor-pointer text-sm ml-2" onClick={handleClose}>
            close
          </Icon>
        </div>
      )}
    </>
  );
};

export default AlertErrorMessage;
