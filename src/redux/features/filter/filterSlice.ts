/* eslint-disable @typescript-eslint/indent */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IFilter {
  searchQuery?: string;
  genreQuery?:
    | ''
    | 'thriller'
    | 'fantasy'
    | 'science_fiction'
    | 'mystery'
    | 'fiction';
  yearQuery?: string;
  pageQuery?: string;
  sortBy?: 'createdAt' | 'author' | 'publicationDate' | 'genre' | 'title';
  sortOrder?: 'asc' | 'desc';
}

const initialState: IFilter = {
  searchQuery: '',
  genreQuery: '',
  yearQuery: '',
  pageQuery: '1',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const filterSlice = createSlice({
  name: 'readingList',
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updateGenreQuery: (
      state,
      action: PayloadAction<
        '' | 'thriller' | 'fantasy' | 'science_fiction' | 'mystery' | 'fiction'
      >,
    ) => {
      state.genreQuery = action.payload;
    },
    updateYearQuery: (state, action: PayloadAction<string>) => {
      state.yearQuery = action.payload;
    },
    upddatePageQuery: (state, action: PayloadAction<string>) => {
      state.pageQuery = action.payload;
    },
    updateSortByQuery: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload as
        | 'createdAt'
        | 'author'
        | 'publicationDate'
        | 'genre'
        | 'title';
    },
    upddateSortOrderQuery: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload as 'asc' | 'desc';
    },
  },
});

export const {
  updateGenreQuery,
  updateSearchQuery,
  updateYearQuery,
  upddatePageQuery,
  updateSortByQuery,
  upddateSortOrderQuery,
} = filterSlice.actions;

export default filterSlice.reducer;
