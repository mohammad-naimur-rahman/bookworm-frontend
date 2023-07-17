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
      <input
        type="text"
        placeholder="Search books..."
        className="input input-bordered input-success w-1/6 mb-10"
        onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
      />

      <select
        className="select select-success w-1/6"
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

      <input
        type="number"
        placeholder="Publication Year"
        className="input input-bordered input-success w-1/6 mb-10"
        onChange={(e) => dispatch(updateYearQuery(e.target.value))}
      />

      <select
        className="select select-success w-1/6"
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

      <select
        className="select select-success w-1/6"
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
    </>
  );
}
