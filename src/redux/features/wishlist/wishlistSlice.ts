import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IBook } from '../../../types/globalTypes';

interface IinitialState {
  books: Array<IBook>;
  total: number;
}

const initialState: IinitialState = {
  books: [],
  total: 0,
};

const wishlistSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload);

      state.total += 1;
    },

    removeFromCart: (state, action: PayloadAction<IBook>) => {
      state.books.filter(({ _id }) => _id !== action.payload._id);

      state.total -= 1;
    },
  },
});

export const { addToCart, removeFromCart } = wishlistSlice.actions;

export default wishlistSlice.reducer;
