import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

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
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IBook>) => {
      const isExist = state.books.find(
        (book) => book._id === action.payload._id,
      );

      if (isExist) {
        toast.error('Book already exists in wishlist!');
      } else {
        toast.success('Book aded to wishlist!');
        state.books.push(action.payload);
        state.total += 1;
      }
    },

    removeFromWishlist: (state, action: PayloadAction<IBook>) => {
      const newVal = state.books.filter(
        ({ _id }) => _id !== action.payload._id,
      );
      state.books = newVal;
      state.total -= 1;
      toast.success('Removed book from wishlist!');
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
