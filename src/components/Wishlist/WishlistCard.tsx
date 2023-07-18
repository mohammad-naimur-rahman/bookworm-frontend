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
    <div className="shadow-xl relative flex sm:flex-col rounded-lg overflow-hidden">
      <div className="sm:w-ful sm:text-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="aspect-[10/16]  h-full sm:w-full sm:h-auto max-w-[220px] sm:max-w-xs object-cover sm:text-center sm:mx-auto"
          />
        ) : (
          <div className="aspect-[9/16] w-full object-cover border-[1px] border-gray-400 flex items-center justify-center">
            <p className="text-2xl font-light">No photo</p>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl md:text-xl py-3">{title}</h3>
          <p className="text-xl md:text-lg">{author}</p>
          <p className="pt-3">
            <span className="pr-2">Publish year:</span>
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
