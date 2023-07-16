import api from '../../api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: (query) => `/books?${query}`,
      providesTags: ['books'],
    }),
    getBook: build.query({
      query: (id) => `/books/${id}`,
      providesTags: ['book'],
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
    updateBook: build.mutation({
      query: ({ id, data, token }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['book'],
    }),
    deleteBook: build.mutation({
      query: ({ id, token }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
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
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostCommentMutation,
  useGetCommentQuery,
} = booksApi;
