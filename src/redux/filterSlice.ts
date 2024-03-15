import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface FilterState {
  filter: string;
}

const initialState: FilterState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    handleFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { handleFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
