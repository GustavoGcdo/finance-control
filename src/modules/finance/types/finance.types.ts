const FinanceTypes = {
  GetUserOperationsHandler: Symbol.for('GetUserOperationsHandler'),
  AddOperationHandler: Symbol.for('AddOperationHandler'),  
  AddExpenseHandler: Symbol.for('AddExpenseHandler'),
  OperationRepository: Symbol.for('OperationRepository'),
};

export default FinanceTypes;
