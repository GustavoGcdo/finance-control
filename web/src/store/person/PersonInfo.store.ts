import { createSlice } from '@reduxjs/toolkit';

const personInfo = createSlice({
  name: 'personInfo',
  initialState: {
    userExtract: {
      name: '',
      email: '',
      totalRecipes: 0,
      totalExpenses: 0,
      balance: 0
    }
  },
  reducers: {
    setUserExtract: (state, action) => {
      state.userExtract = action.payload;
    }
  }
});

export const { setUserExtract } = personInfo.actions;
export default personInfo.reducer;
