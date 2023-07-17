/* eslint-disable @typescript-eslint/naming-convention */
import { Link } from 'react-router-dom';

import WishListMenu from './WishListMenu';
import bookGenres from '../../constants';
import styles from '../../styles/components/allBooks/bookCard.module.scss';
import { IBook } from '../../types/globalTypes';

interface Props {
  data: IBook;
}

export default function BookCard({ data }: Props) {
  const { _id, title, author, genre, publicationDate, image } = { ...data };

  const genreValue = bookGenres.find((g) => g.value === genre);

  return (
    <div
      className={`${styles.bookCard} shadow-2xl relative rounded-md overflow-hidden`}
    >
      <div className={`${styles.wishlist} absolute right-2 top-2`}>
        <WishListMenu data={data} />
      </div>
      {image ? (
        <img
          src={image}
          alt={title}
          className="aspect-[9/16] w-full object-cover"
        />
      ) : (
        <div className="aspect-[9/16] w-full object-cover border-[1px] border-gray-400 flex items-center justify-center">
          <p className="text-2xl font-light">No photo</p>
        </div>
      )}
      <div className="pb-5 px-5 pt-2 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl py-3">{title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl">{author}</p>
            <p className="text-lg">{publicationDate}</p>
          </div>
          <span className="px-5 py-1.5 bg-accent my-5 inline-block text-white rounded-full">
            {genreValue?.label}
          </span>
        </div>

        <Link to={`/book-details/${_id}`}>
          <button className="btn btn-primary px-8 mt-2" type="button">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
