/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import bookGenres, { sortByObj } from '../../constants';
import {
  updateGenreQuery,
  updateSearchQuery,
  updateSortByQuery,
  updateYearQuery,
  upddateSortOrderQuery,
} from '../../redux/features/filter/filterSlice';
import { useAppDispatch } from '../../redux/hooks';

export default function BookFiltersComponents() {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="w-1/6 xl:w-1/3 md:w-1/2 sm:w-full px-1 pb-2">
        <input
          type="text"
          placeholder="Search books..."
          className="input input-bordered input-success w-full"
          onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
        />
      </div>

      <div className="w-1/6 xl:w-1/3 md:w-1/2 sm:w-full pb-2 px-1">
        <select
          className="select select-success w-full"
          onChange={(e) =>
            dispatch(
              updateGenreQuery(
                e.target.value as
                  | ''
                  | 'thriller'
                  | 'fantasy'
                  | 'science_fiction'
                  | 'mystery'
                  | 'fiction',
              ),
            )
          }
        >
          {[{ label: 'All Genre', value: '' }, ...bookGenres].map(
            ({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="w-1/6 xl:w-1/3 md:w-1/2 sm:w-full pb-2 px-1">
        <input
          type="number"
          placeholder="Publication Year"
          className="input input-bordered input-success w-full"
          onChange={(e) => dispatch(updateYearQuery(e.target.value))}
        />
      </div>

      <div className="w-1/6 xl:w-1/3 md:w-1/2 sm:w-full pb-2 px-1">
        <select
          className="select select-success w-full"
          onChange={(e) =>
            dispatch(
              updateSortByQuery(
                e.target.value as
                  | 'createdAt'
                  | 'author'
                  | 'publicationDate'
                  | 'genre'
                  | 'title',
              ),
            )
          }
        >
          {sortByObj.map(({ label, value }) => (
            <option key={value} value={value}>
              Sort by {label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-1/6 xl:w-1/3 md:w-1/2 sm:w-full pb-2 px-1">
        <select
          className="select select-success w-full"
          onChange={(e) =>
            dispatch(upddateSortOrderQuery(e.target.value as 'asc' | 'desc'))
          }
        >
          {[
            { label: 'Descending', value: 'desc' },
            { label: 'Ascending', value: 'asc' },
          ].map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
