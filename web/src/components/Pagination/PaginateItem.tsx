type Props = {
  text: React.ReactNode;
  isDisabled?: boolean;
  isActive?: boolean;
  onClick: () => void;
};

const BaseStyle = {
  default:
    'py-1 px-3 rounded select-none text-sm font-medium cursor-pointer transition-all border-transparent border-solid border-[1px]',
  active: 'bg-primary text-white font-medium',
  disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed'
};

const PaginateItem = (props: Props) => {
  return (
    <li
      className={`
        ${BaseStyle.default} 
        ${props.isDisabled ? BaseStyle.disabled : ''} 
        ${props.isActive ? BaseStyle.active : ''}
      `}
      onClick={() => props.onClick()}
    >
      <span>{props.text}</span>
    </li>
  );
};

export default PaginateItem;
