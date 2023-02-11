import { AppThunk } from '..';
import { getOperations } from '../../services/finances.service';
import { setOperations } from './Operations.store';

export const getOperationsAction = (date: Date, page = 1): AppThunk => {
  return async (dispatch) => {
    const result = await getOperations(page, date);
    dispatch(setOperations(result.data));
  };
};
