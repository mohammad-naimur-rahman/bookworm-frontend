import BookCard from '../components/AllBooks/BookCard';
import Layout from '../layout/Layout';
import { useGetBooksQuery } from '../redux/features/books/booksApi';
import { IBook } from '../types/globalTypes';

export default function AllBooks() {
  const { data } = useGetBooksQuery(undefined);
  return (
    <Layout title="All Books">
      <h1 className="text-4xl text-center py-10">All Books</h1>
      <section className="grid grid-cols-4 gap-4 pb-20">
        {data?.data?.map((book: IBook) => (
          <BookCard key={book._id} data={book} />
        ))}
      </section>
    </Layout>
  );
}
