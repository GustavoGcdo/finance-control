import React from 'react';
import { FunctionComponent } from 'react';
import Icon from '@material-ui/core/Icon';
import './Goback.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const GoBack: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const handleClick = () => {
    history.goBack();
  };

  return (
    <Icon onClick={handleClick} className='btn-go-back' color='action'>
      arrow_back
    </Icon>
  );
};

export default withRouter(GoBack);
