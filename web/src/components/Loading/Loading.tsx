import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import './Loading.scss';

type Props = { isLoading: boolean };

const Loading: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className="backdrop-container">
      <CircularProgress className="circular-progress" color="primary" />
    </div>
  );
};

export default Loading;
