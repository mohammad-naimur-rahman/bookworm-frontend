import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_apiURL}/api/v1/`,
  }),
  tagTypes: ['products'],
  endpoints: () => ({}),
});

export default api;
