import BookCard from '../components/AllBooks/BookCard';
import Layout from '../layout/Layout';
import { useGetBooksQuery } from '../redux/features/books/booksApi';
import { IBook } from '../types/globalTypes';

export default function AllBooks() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout title="All Books">
      <h1 className="text-4xl text-center py-10">All Books</h1>
      <section className="container sm:px-0 grid grid-cols-4 xxl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-6 xxl:gap-5 xl:gap-4 md:gap-3 sm:gap-6 pb-20">
        {data?.data?.map((book: IBook) => (
          <BookCard key={book._id} data={book} />
        ))}
      </section>
    </Layout>
  );
}
