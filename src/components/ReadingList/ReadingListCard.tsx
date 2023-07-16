/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import bookGenres from '../../constants';
import {
  IBookReading,
  removeFromReadingList,
  updateBookFromReadingList,
} from '../../redux/features/readingList/readingListSlice';
import { useAppDispatch } from '../../redux/hooks';

interface Props {
  data: IBookReading;
}

const readingStatus = ['Will read', 'Reading', 'Completed'];

export default function ReadingListCard({ data }: Props) {
  const { book, status } = data;

  const { _id, title, author, image, genre, publicationDate } = { ...book };

  const genreValue = bookGenres.find((g) => g.value === genre);

  const dispatch = useAppDispatch();

  const handleReadingStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentStatus = e.target.value as
      | 'Will read'
      | 'Reading'
      | 'Completed';
    if (readingStatus.includes(currentStatus)) {
      dispatch(updateBookFromReadingList({ book, status: currentStatus }));
    }
  };

  return (
    <div className="shadow-xl relative flex rounded-lg overflow-hidden">
      <div>
        {image ? (
          <img
            src={image}
            alt={title}
            className="aspect-[9/16] w-full max-w-[220px] object-cover"
          />
        ) : (
          <div className="aspect-[9/16] w-[220px] object-cover border-[1px] border-gray-400 flex items-center justify-center">
            <p className="text-2xl font-light">No photo</p>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl py-3">{title}</h3>
          <p className="text-xl">{author}</p>
          <p className="pt-3">
            <span className="pr-2">Publish year:</span>
            {publicationDate}
          </p>
          <span className="px-5 py-1.5 bg-accent my-5 inline-block text-white rounded-full">
            {genreValue?.label}
          </span>
        </div>

        <select
          className="select select-primary w-full max-w-xs"
          onChange={handleReadingStatus}
        >
          {readingStatus.map((value) => (
            <option key={value} value={value} selected={value === status}>
              {value}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-3">
          <Link to={`/book-details/${_id}`}>
            <button className="btn btn-link" type="button">
              Details
            </button>
          </Link>
          <button
            className="btn btn-error self-start"
            type="button"
            onClick={() => dispatch(removeFromReadingList(data.book))}
          >
            Remove from wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
