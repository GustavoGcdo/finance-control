import { useResponsive } from '../../../../hooks/useResponsive';
import { Operation } from '../../../../models/operation';
import CardsView from './CardsView/CardsView';
import TableView from './TableView/TableView';

type OperationListProps = {
  operationList?: Operation[];
  onItemSelected?: (operation: Operation, action: 'edit' | 'delete') => void;
};

const OperationsList = ({ operationList = [], onItemSelected }: OperationListProps) => {
  const { isMobile } = useResponsive();

  const renderViewList = () => {
    if (isMobile) {
      return <CardsView operationList={operationList} onItemSelected={onItemSelected} />;
    }

    return <TableView operationList={operationList} onItemSelected={onItemSelected} />;
  };

  return (
    <div>
      {renderViewList()}

      {operationList.length === 0 && (
        <div className="p-4 font-medium text-neutral-400 rounded text-lg bg-neutral-200">Ops.. não há lançamentos aqui</div>
      )}
    </div>
  );
};

export default OperationsList;
