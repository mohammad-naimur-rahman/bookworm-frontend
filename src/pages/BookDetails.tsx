import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

import bookGenres from '../constants';
import Layout from '../layout/Layout';
import {
  useDeleteBookMutation,
  useGetBookQuery,
  usePostReviewMutation,
} from '../redux/features/books/booksApi';
import { useAppSelector } from '../redux/hooks';
import { IReview } from '../types/globalTypes';

export default function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data } = useGetBookQuery(id);
  const [genreVal, setgenreVal] = useState('');

  useEffect(() => {
    if (data?.data?.genre) {
      const genreValue = bookGenres.find((g) => g.value === data?.data?.genre);
      if (genreValue) {
        setgenreVal(genreValue.label);
      }
    }
  }, [data?.data?.genre]);
  const {
    user: { email },
  } = useAppSelector((state) => state.user);

  const token = localStorage.getItem('token');

  const [deleteBook, { isLoading: isLoadingDeleteBook, isError, isSuccess }] =
    useDeleteBookMutation();

  const handleDeleteBook = () => {
    deleteBook({ id, token });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/all-books');
    }
  }, [isSuccess, navigate]);

  const [
    postReview,
    {
      isLoading: isLoadingPostReview,
      isSuccess: isSuccessPostReview,
      isError: isErrorPostReview,
    },
  ] = usePostReviewMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  interface Inputs {
    review: string;
  }

  const onSubmit: SubmitHandler<Inputs> = (reviewData) => {
    if (!token) {
      toast.error('Login first!');
    }
    postReview({ id, data: reviewData, token });
  };

  useEffect(() => {
    if (isLoadingDeleteBook) {
      toast.success('Deleting book...');
    }

    if (isSuccess) {
      toast.success('Book deleted successfully!');
    }

    if (isError) {
      toast.error('Book delete failed!');
    }

    if (isLoadingPostReview) {
      toast.success('Posting review...');
    }

    if (isSuccessPostReview) {
      toast.success('Review posted successfully!');
      reset();
    }

    if (isErrorPostReview) {
      toast.error('Post review failed!');
      reset();
    }
  }, [
    isLoadingDeleteBook,
    isSuccess,
    isError,
    isLoadingPostReview,
    isSuccessPostReview,
    isErrorPostReview,
    reset,
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout title={data?.data?.title}>
      <main className="flex flex-col items-center min-h-[calc(100dvh_-_80px)]">
        <h2 className="text-4xl md:text-2xl py-10">{data?.data?.title}</h2>
        {data?.data?.image ? (
          <img
            src={data?.data?.image}
            alt={data?.data?.title}
            className="max-w-[500px]"
          />
        ) : null}
        <div className="flex text-2xl md:text-xl pt-10">
          <h3 className="font-semibold pr-5">Author:</h3>
          <p>{data?.data?.author}</p>
        </div>
        <div className="flex text-2xl md:text-xl py-2">
          <h3 className="font-semibold pr-5">Genre:</h3>
          <p>{genreVal}</p>
        </div>
        <div className="flex text-2xl md:text-xl py-2">
          <h3 className="font-semibold pr-5">Publication Year:</h3>
          <p>{data?.data?.publicationDate}</p>
        </div>

        <h2 className="text-3xl md:text-2xl pt-10 pb-5">Reviews</h2>

        <form
          className="flex flex-wrap gap-5 items-center pb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <textarea
              placeholder="Write your review"
              className="textarea textarea-accent max-w-sm w-80"
              {...register('review', { required: true })}
            />
            {errors.review && (
              <span className="text-error mt-2">Review is required</span>
            )}
          </div>
          <button type="submit" className="btn btn-accent px-8">
            Submit
          </button>
        </form>

        {data?.data?.reviews ? (
          <div className="max-w-[900px]">
            {data?.data?.reviews?.map((review: IReview) => (
              <div
                key={review._id}
                className="flex flex-col gap-2 mb-5 text-left"
              >
                <h3 className="text-xl md:text-lg text-secondary">
                  {review.user.name}
                </h3>
                <p className="text-lg md:text-base">{review.review}</p>
              </div>
            ))}
          </div>
        ) : null}

        {data?.data?.reviews?.length === 0 ? (
          <p className="text-xl italic">No review for this book yet</p>
        ) : null}

        {email ? (
          <div className="flex gap-5 py-10">
            <Link to={`/update-book/${id}`}>
              <button className="btn btn-primary" type="button">
                Update book
              </button>
            </Link>
            <button
              className="btn btn-error"
              type="button"
              onClick={handleDeleteBook}
            >
              Delete book
            </button>
          </div>
        ) : null}
      </main>
    </Layout>
  );
}
