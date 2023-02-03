import { getUserExtract } from '../../services/finances.service';
import { AppThunk } from '../index';
import { setUserExtract } from './PersonInfo.store';

export const getUserExtractAction = (): AppThunk => async (dispatch) => {
  const result = await getUserExtract();
  dispatch(setUserExtract(result.data));
};
