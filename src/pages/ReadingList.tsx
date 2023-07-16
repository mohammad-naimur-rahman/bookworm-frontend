/* eslint-disable react/jsx-one-expression-per-line */
import ReadingListCard from '../components/ReadingList/ReadingListCard';
import Layout from '../layout/Layout';
import { useAppSelector } from '../redux/hooks';

export default function ReadingList() {
  const { total, books } = useAppSelector((state) => state.readingList);
  return (
    <Layout title="Reading List">
      <div className="container min-h-[calc(100dvh_-_80px)]">
        <h2 className="text-4xl text-center py-10">Reading List</h2>
        <h3 className="text-3xl">Total Books: {total}</h3>
        <div className="grid grid-cols-2 gap-5 py-10">
          {books?.map((book) => (
            <ReadingListCard key={book.book._id} data={book} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
