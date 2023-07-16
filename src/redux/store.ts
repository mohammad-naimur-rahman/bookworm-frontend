import { configureStore } from '@reduxjs/toolkit';

import api from './api/apiSlice';
import filterReducer from './features/filter/filterSlice';
import readingListReducer from './features/readingList/readingListSlice';
import userReducer from './features/user/userSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishlistReducer,
    readingList: readingListReducer,
    filter: filterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
