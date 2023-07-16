import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import { IBook } from '../../../types/globalTypes';

export interface IBookReading {
  book: IBook;
  status: 'Will read' | 'Reading' | 'Completed';
}

interface IinitialState {
  books: Array<IBookReading>;
  total: number;
}

const initialState: IinitialState = {
  books: [],
  total: 0,
};

const readingListSlice = createSlice({
  name: 'readingList',
  initialState,
  reducers: {
    addToReadingList: (state, action: PayloadAction<IBook>) => {
      const isExist = state.books.find(
        (book) => book.book._id === action.payload._id,
      );

      if (isExist) {
        toast.error('Book already exists in readingList!');
      } else {
        toast.success('Book aded to reading list!');
        state.books.push({ book: action.payload, status: 'Will read' });
        state.total += 1;
      }
    },
    removeFromReadingList: (state, action: PayloadAction<IBook>) => {
      const newVal = state.books.filter(
        ({ book: { _id } }) => _id !== action.payload._id,
      );
      state.books = newVal;
      state.total -= 1;
      toast.success('Removed book from reading list!');
    },
    updateBookFromReadingList: (state, action: PayloadAction<IBookReading>) => {
      const newVal = state.books.map(({ book, status }) => {
        if (book._id === action.payload.book._id) {
          return { book, status: action.payload.status };
        }
        return { book, status };
      });
      state.books = newVal;
      toast.success('Updated book reading status!');
    },
  },
});

export const {
  addToReadingList,
  removeFromReadingList,
  updateBookFromReadingList,
} = readingListSlice.actions;

export default readingListSlice.reducer;
