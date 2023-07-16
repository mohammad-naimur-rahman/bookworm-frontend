import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import bookGenres from '../constants';
import Layout from '../layout/Layout';
import { useGetBookQuery } from '../redux/features/books/booksApi';
import { useAppSelector } from '../redux/hooks';

export default function BookDetails() {
  const { id } = useParams();
  const { isLoading, data } = useGetBookQuery(id);
  const [genreVal, setgenreVal] = useState('');

  useEffect(() => {
    if (data?.data?.genre) {
      const genreValue = bookGenres.find((g) => g.value === data?.data?.genre);
      if (genreValue) {
        setgenreVal(genreValue.label);
      }
    }
  }, [data?.data?.genre]);
  const {
    user: { email },
  } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <main className="flex flex-col items-center min-h-[calc(100dvh_-_80px)]">
        <h2 className="text-4xl py-10">{data?.data?.title}</h2>
        {data?.data?.image ? (
          <img
            src={data?.data?.image}
            alt={data?.data?.title}
            className="max-w-[500px]"
          />
        ) : null}
        <div className="flex text-2xl pt-10">
          <h3 className="font-semibold pr-5">Author:</h3>
          <p>{data?.data?.author}</p>
        </div>
        <div className="flex text-2xl py-2">
          <h3 className="font-semibold pr-5">Genre:</h3>
          <p>{genreVal}</p>
        </div>
        <div className="flex text-2xl py-2">
          <h3 className="font-semibold pr-5">Publication Year:</h3>
          <p>{data?.data?.publicationDate}</p>
        </div>
        {email ? (
          <div className="flex gap-5 py-10">
            <Link to={`/update-book/${id}`}>
              <button className="btn btn-primary" type="button">
                Update book
              </button>
            </Link>
            <button className="btn btn-error" type="button">
              Delete book
            </button>
          </div>
        ) : null}
      </main>
    </Layout>
  );
}
