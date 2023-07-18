export interface IReview {
  _id: string;
  review: string;
  user: {
    _id: string;
    name: string;
  };
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image?: string;
  reviews?: Array<IReview>;
}
