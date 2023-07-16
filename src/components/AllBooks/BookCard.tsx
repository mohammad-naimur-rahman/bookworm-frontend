/* eslint-disable @typescript-eslint/naming-convention */
import { Link } from 'react-router-dom';

import bookGenres from '../../constants';
import { IBook } from '../../types/globalTypes';
import formatDate from '../../utils/formatDate';

interface Props {
  data: IBook;
}

export default function BookCard({ data }: Props) {
  const { _id, title, author, genre, publicationDate, image } = { ...data };

  const genreValue = bookGenres.find((g) => g.value === genre);

  const formattedDateString = formatDate(publicationDate);

  return (
    <div className="shadow-2xl p-5">
      {image ? <img src={image} alt={title} /> : null}
      <h3 className="text-2xl">{title}</h3>
      <p className="text-xl">{author}</p>
      <p className="text-lg">{formattedDateString}</p>
      <span className="px-5 py-1.5 bg-accent my-5 inline-block text-white rounded-full">
        {genreValue?.label}
      </span>
      <br />
      <Link to={`/book-details/${_id}`}>
        <button className="btn btn-primary" type="button">
          Details
        </button>
      </Link>
    </div>
  );
}
