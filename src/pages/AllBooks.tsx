/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BookCard from '../components/AllBooks/BookCard';
import BookFiltersComponents from '../components/AllBooks/BookFiltersComponents';
import Layout from '../layout/Layout';
import { useGetBooksQuery } from '../redux/features/books/booksApi';
import { upddatePageQuery } from '../redux/features/filter/filterSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IBook } from '../types/globalTypes';
import convertFilterToQueryString from '../utils/convertFilterToQueryString';

export default function AllBooks() {
  const { searchQuery, genreQuery, yearQuery, pageQuery, sortBy, sortOrder } =
    useAppSelector((state) => state.filter);

  const {
    user: { email },
  } = useAppSelector((state) => state.user);

  const [filters, setFilters] = useState<string | undefined>(undefined);

  const dispatch = useAppDispatch();

  const searchBooks = () => {
    const result = convertFilterToQueryString({
      searchQuery,
      genreQuery,
      yearQuery,
      pageQuery,
      sortBy,
      sortOrder,
    });

    console.log(result);
    setFilters(result);
  };

  const { data, isLoading, refetch } = useGetBooksQuery(filters);

  useEffect(() => {
    refetch();
  }, [refetch, filters, pageQuery]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout title="All Books">
      <div className="container min-h-[calc(100dvh_-_80px)]">
        <h1 className="text-4xl text-center py-10">All Books</h1>

        <div className="flex gap-5 w-full">
          <BookFiltersComponents />
          <button
            className="btn btn-success w-1/6 mb-10"
            type="button"
            onClick={searchBooks}
          >
            Search Books
          </button>
        </div>

        <section className="sm:px-0 grid grid-cols-4 xxl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-6 xxl:gap-5 xl:gap-4 md:gap-3 sm:gap-6 pb-20">
          {data?.data?.map((book: IBook) => (
            <BookCard key={book._id} data={book} />
          ))}
        </section>

        {data?.data?.length < 1 ? (
          <h2 className="text-center w-full pb-20 text-4xl">No books found!</h2>
        ) : null}

        {data?.data?.length >= 1 ? (
          <div className="join grid grid-cols-2 max-w-xs mx-auto mb-10">
            <button
              type="button"
              className="join-item btn btn-outline"
              disabled={+pageQuery! < 2}
              onClick={() => {
                dispatch(upddatePageQuery((+pageQuery! - 1).toString()));
                searchBooks();
              }}
            >
              Previous page
            </button>
            <button
              type="button"
              className="join-item btn btn-outline btn-success"
              onClick={() => {
                dispatch(upddatePageQuery((+pageQuery! + 1).toString()));
                searchBooks();
              }}
              disabled={
                data?.meta?.page * data?.meta?.limit >= data?.meta?.total
              }
            >
              Next
            </button>
          </div>
        ) : null}
        {email ? (
          <div className="flex justify-center">
            <Link to="/create-book">
              <button className="btn btn-success btn-lg mb-20" type="button">
                Add New Book
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
