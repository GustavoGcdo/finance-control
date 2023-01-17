import Icon from '@material-ui/core/Icon';
import { useNavigate } from 'react-router-dom';
import './Goback.scss';

const GoBack = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Icon onClick={handleClick} className="btn-go-back" color="action">
      arrow_back
    </Icon>
  );
};

export default GoBack;
