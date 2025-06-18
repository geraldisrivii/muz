import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: {
    items: [],
    status: 'loading',
  },
  category: {
    items: [],
    status: 'loading',
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const productsReducer = productsSlice.reducer;
