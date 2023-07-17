/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';

import bookGenres from '../constants';
import Layout from '../layout/Layout';
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from '../redux/features/books/booksApi';
import { useAppSelector } from '../redux/hooks';
import uploadImg from '../utils/uploadImg';

interface Inputs {
  title: string;
  author: string;
  genre: 'fiction' | 'mystery' | 'science_fiction' | 'fantasy' | 'triller';
  image?: string;
  publicationDate: Date;
}

function UpdateBook() {
  const { id } = useParams();
  const { isLoading: isLoadingBook, data: bookData } = useGetBookQuery(id);
  const { email } = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [bookImg, setbookImg] = useState('');

  useEffect(() => {
    if (bookData?.data?.image) {
      setbookImg(bookData?.data?.image);
    }
  }, [bookData?.data?.image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const uploadButtonRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgURL = await uploadImg(e);
    if (imgURL) {
      setbookImg(imgURL);
    }
  };

  const [updateBook, { isLoading, isSuccess, isError }] =
    useUpdateBookMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/book-details/${id}`);
    }
  }, [isSuccess, navigate, id]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!email) {
      toast.error('Login first!');
      return;
    }
    const allData = { ...data, image: bookImg };
    const token = localStorage.getItem('token');
    updateBook({ data: allData, id, token });
  };

  if (isLoadingBook) {
    return <p>Loading...</p>;
  }

  return (
    <Layout title="Update Book">
      <div className="min-h-[calc(100dvh_-_80px)] flex">
        <div className="w-1/2">
          <h2 className="text-3xl pb-7 pt-12">Update book</h2>
          <form
            className="flex flex-col gap-3 items-start pb-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered input-primary w-full max-w-xs"
              defaultValue={bookData?.data?.title}
              {...register('title', { required: true })}
            />
            {errors.title && <p className="text-red-600">Title is required</p>}

            <input
              type="text"
              placeholder="Author"
              className="input input-bordered input-primary w-full max-w-xs"
              defaultValue={bookData?.data?.author}
              {...register('author', { required: true })}
            />
            {errors.author && (
              <p className="text-red-600">Author is required</p>
            )}

            <select
              className="select select-primary w-full max-w-xs"
              {...register('genre')}
            >
              {bookGenres.map(({ label, value }) => (
                <option
                  key={value}
                  value={value}
                  selected={bookData?.data?.genre === value}
                >
                  {label}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Publication Year"
              defaultValue={bookData?.data?.publicationDate}
              {...register('publicationDate', { required: true })}
            />
            {errors.publicationDate && (
              <p className="text-red-600">Publication date is required</p>
            )}

            <input
              type="file"
              accept="image/*"
              ref={uploadButtonRef}
              className="hidden"
              onChange={handleImageUpload}
            />

            <button
              className="btn btn-outline btn-secondary flex items-center justify-center"
              type="button"
              onClick={() => uploadButtonRef?.current?.click()}
            >
              <p className="pr-3">Upload photo</p>
              <BsFillCloudUploadFill />
            </button>
            <button type="submit" className="btn btn-primary px-8">
              Update book
            </button>
          </form>
        </div>
        <div className="w-1/2">
          {bookImg ? (
            <img src={bookImg} alt="Book name" className="max-w-sm" />
          ) : null}
        </div>
        {isLoading === true ? toast.success('Updating book...') : null}
        {isSuccess === true ? toast.success('Book update successfully!') : null}
        {isError === true ? toast.error('Book creation failed!') : null}
      </div>
    </Layout>
  );
}

export default UpdateBook;
