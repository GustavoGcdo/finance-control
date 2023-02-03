import { AppThunk } from '..';
import { Operation } from '../../models/operation';
import { addOperation, getOperations } from '../../services/finances.service';
import { getUserExtractAction } from '../person/Person.actions';
import { setOperations } from './Operations.store';

export const getOperationsAction = (page: number = 1): AppThunk => {
  return async (dispatch) => {
    const result = await getOperations(page);
    dispatch(setOperations(result.data));
  };
};

export const addOperationAction = (newOperation: Operation): AppThunk => {
  return async (dispatch) => {
    await addOperation(newOperation);
    dispatch(getOperationsAction());
    dispatch(getUserExtractAction());
  };
};
