/* eslint-disable @typescript-eslint/naming-convention */
import { Link } from 'react-router-dom';

import bookGenres from '../../constants';
import { removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useAppDispatch } from '../../redux/hooks';
import { IBook } from '../../types/globalTypes';

interface Props {
  data: IBook;
}

export default function WishlistCard({ data }: Props) {
  const { _id, title, author, genre, publicationDate, image } = { ...data };

  const genreValue = bookGenres.find((g) => g.value === genre);

  const dispatch = useAppDispatch();

  return (
    <div className="shadow-xl relative flex rounded-lg overflow-hidden">
      <div>
        {image ? (
          <img
            src={image}
            alt={title}
            className="aspect-[9/16] w-full max-w-[200px] object-cover"
          />
        ) : (
          <div className="aspect-[9/16] w-full object-cover border-[1px] border-gray-400 flex items-center justify-center">
            <p className="text-2xl font-light">No photo</p>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl py-3">{title}</h3>
          <p className="text-xl">{author}</p>
          <p className="pt-3">
            Publish year:
            {publicationDate}
          </p>
          <span className="px-5 py-1.5 bg-accent my-5 inline-block text-white rounded-full">
            {genreValue?.label}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Link to={`/book-details/${_id}`}>
            <button className="btn btn-link" type="button">
              Details
            </button>
          </Link>
          <button
            className="btn btn-error self-start"
            type="button"
            onClick={() => dispatch(removeFromWishlist(data))}
          >
            Remove from wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
