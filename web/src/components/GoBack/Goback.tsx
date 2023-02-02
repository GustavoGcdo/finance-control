import Icon from '@material-ui/core/Icon';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Icon onClick={handleClick} className="cursor-pointer mr-3 block" color="action">
      arrow_back
    </Icon>
  );
};

export default GoBack;
