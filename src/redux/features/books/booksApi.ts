import api from '../../api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => '/books',
      providesTags: ['books'],
    }),
    getBook: build.query({
      query: (id) => `/books/${id}`,
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
      invalidatesTags: ['books'],
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
