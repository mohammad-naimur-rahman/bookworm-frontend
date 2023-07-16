import { Link, useParams } from 'react-router-dom';

import Layout from '../layout/Layout';
import { useGetBookQuery } from '../redux/features/books/booksApi';
import { useAppSelector } from '../redux/hooks';

export default function BookDetails() {
  const { id } = useParams();
  const {
    data: {
      data: { title, author, genre, image, publicationDate },
    },
  } = useGetBookQuery(id);
  const {
    user: { email },
  } = useAppSelector((state) => state.user);
  return (
    <Layout>
      <main className="flex flex-col items-center">
        <h2 className="text-4xl py-10">{title}</h2>
        {image ? (
          <img src={image} alt={title} className="max-w-[500px]" />
        ) : null}
        <div className="flex text-2xl pt-10">
          <h3 className="font-semibold pr-5">Author:</h3>
          <p>{author}</p>
        </div>
        <div className="flex text-2xl py-2">
          <h3 className="font-semibold pr-5">Genre:</h3>
          <p>{genre}</p>
        </div>
        <div className="flex text-2xl py-2">
          <h3 className="font-semibold pr-5">Publication Year:</h3>
          <p>{publicationDate}</p>
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
