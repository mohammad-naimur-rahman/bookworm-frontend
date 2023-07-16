interface IBookGenre {
  label: string;
  value: string;
}

const bookGenres: Array<IBookGenre> = [
  { label: 'Fiction', value: 'fiction' },
  { label: 'Mystery', value: 'mystery' },
  { label: 'Science Fiction', value: 'science_fiction' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Thriller', value: 'thriller' },
];

export const sortByObj: Array<IBookGenre> = [
  { label: 'Creation Date', value: 'createdAt' },
  { label: 'Title', value: 'title' },
  { label: 'Author', value: 'author' },
  { label: 'Genre', value: 'genre' },
  { label: 'Publication Year', value: 'publicationDate' },
];

export default bookGenres;
