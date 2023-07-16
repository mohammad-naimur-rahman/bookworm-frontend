import { addToReadingList } from '../../redux/features/readingList/readingListSlice';
import { addToWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useAppDispatch } from '../../redux/hooks';
import { IBook } from '../../types/globalTypes';

interface Props {
  data: IBook;
}

export default function WishListMenu({ data }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-2 pt-2 pb-1 px-3 rounded-full bg-secondary">
      <div
        className="cursor-pointer"
        onClick={() => dispatch(addToWishlist(data))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.2c-3.58-3.87-9.56-.8-8.92 4.79.5 3.59 8.92 8.99 8.92 8.99s8.42-5.4 8.92-8.99c.64-5.59-5.34-8.66-8.92-4.79z"
          />
        </svg>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => dispatch(addToReadingList(data))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM9 19H7V5h2v14zm6 0h-2V5h2v14zm4 0h-2V5h2v14z" />
        </svg>
      </div>
    </div>
  );
}
