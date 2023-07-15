import api from '../../api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => '/products',
      providesTags: ['products'],
    }),
    getBook: build.query({
      query: (id) => `/product/${id}`,
    }),
    createBook: build.mutation({
      query: ({ data, token }) => ({
        url: '/books',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['products'],
    }),
    postComment: build.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    getComment: build.query({
      query: (id) => `/comment/${id}`,
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
  usePostCommentMutation,
  useGetCommentQuery,
} = booksApi;
