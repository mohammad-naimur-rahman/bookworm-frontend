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

export default bookGenres;
