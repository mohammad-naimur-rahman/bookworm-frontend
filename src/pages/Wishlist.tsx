/* eslint-disable react/jsx-one-expression-per-line */
import WishlistCard from '../components/Wishlist/WishlistCard';
import Layout from '../layout/Layout';
import { useAppSelector } from '../redux/hooks';

export default function Wishlist() {
  const { total, books } = useAppSelector((state) => state.wishlist);
  return (
    <Layout title="Wishlist">
      <div className="container min-h-[calc(100dvh_-_80px)]">
        <h2 className="text-4xl text-center py-10">Wishlist</h2>
        <h3 className="text-3xl">Total Books: {total}</h3>
        <div className="grid grid-cols-2 gap-5 py-10">
          {books?.map((book) => <WishlistCard key={book._id} data={book} />)}
        </div>
      </div>
    </Layout>
  );
}
