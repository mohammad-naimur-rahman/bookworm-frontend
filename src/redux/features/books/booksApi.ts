import api from '../../api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => '/products',
    }),
    getProduct: build.query({
      query: (id) => `/product/${id}`,
    }),
    postComment: build.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: build.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostCommentMutation,
  useGetCommentQuery,
} = booksApi;
