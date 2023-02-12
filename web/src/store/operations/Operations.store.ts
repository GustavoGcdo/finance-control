import { createSlice } from '@reduxjs/toolkit';
import { Operation } from '../../models/operation';
import { PaginateResult } from '../../types/PaginateResult';

const initialPaginateData: PaginateResult<Operation> = {
  results: [],
  total: 0
};

const operations = createSlice({
  name: 'operations',
  initialState: {
    paginateOperations: initialPaginateData,
    activeDateSelected: new Date().toJSON(),
  },
  reducers: {
    setOperations: (state, action) => {
      state.paginateOperations = action.payload;
    },
    setActiveDate: (state, action) => {
      state.activeDateSelected = action.payload;
    }
  }
});

export const { setOperations, setActiveDate } = operations.actions;
export default operations.reducer;

