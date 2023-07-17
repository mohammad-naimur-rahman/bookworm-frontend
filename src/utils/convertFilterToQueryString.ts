import { IFilter } from '../redux/features/filter/filterSlice';

const convertFilterToQueryString = (filter: IFilter) => {
  const params = new URLSearchParams();

  if (filter.searchQuery) {
    params.append('searchTerm', filter.searchQuery);
  }
  if (filter.genreQuery) {
    params.append('genre', filter.genreQuery);
  }
  if (filter.yearQuery) {
    params.append('publicationDate', filter.yearQuery);
  }
  if (filter.pageQuery) {
    params.append('page', filter.pageQuery as string);
  }

  if (filter.sortBy) {
    params.append('sortBy', filter.sortBy as string);
  }

  if (filter.sortOrder) {
    params.append('sortOrder', filter.sortOrder as string);
  }

  params.append('limit', '10');

  return params.toString();
};

export default convertFilterToQueryString;
