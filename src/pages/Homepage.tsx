import { Link } from 'react-router-dom';

import BookCard from '../components/AllBooks/BookCard';
import Layout from '../layout/Layout';
import { useGetBooksQuery } from '../redux/features/books/booksApi';
import { IBook } from '../types/globalTypes';

import heroBook2 from '@/assets/images/eat-that-frog.jpg';
import frame7 from '@/assets/images/frames/Frame-1-10.png';
import frame3 from '@/assets/images/frames/Frame-11-10.png';
import frame4 from '@/assets/images/frames/Frame-12-10.png';
import frame6 from '@/assets/images/frames/Frame-13-10.png';
import frame1 from '@/assets/images/frames/Frame-14-10.png';
import frame5 from '@/assets/images/frames/Frame-17-8.png';
import frame2 from '@/assets/images/frames/Frame-3-12.png';
import heroBook1 from '@/assets/images/power-of-habit.jpg';

export default function Homepage() {
  const { data, isLoading } = useGetBooksQuery('');
  return (
    <Layout>
      <div className="flex xl:flex-col items-center justify-center min-h-[calc(100vh_-_80px)] relative">
        <img
          src={frame1}
          alt="frame1"
          className="absolute top-16 left-5 w-60 animate-bounceInOut xl:hidden"
        />
        <img
          src={frame2}
          alt="frame1"
          className="absolute top-36 left-[300px] w-60 animate-bounceOutIn xl:hidden"
        />
        <img
          src={frame3}
          alt="frame2"
          className="absolute bottom-20 left-20 w-60 animate-bounceInOut xl:hidden"
        />
        <img
          src={frame4}
          alt="frame1"
          className="absolute bottom-48 left-[500px] xxl:left-[450px] w-60 animate-bounceOutIn xl:hidden"
        />
        <img
          src={frame7}
          alt="frame1"
          className="absolute bottom-96 left-[550px] xxl:left-[430px] w-60 animate-bounceInOut xl:hidden"
        />
        <section className="w-3/5 xl:w-full pl-20 order-1 xl:order-2 md:pl-0">
          <h1 className="text-7xl xl:hidden">Welcome</h1>
          <h1 className="text-7xl py-5 xl:hidden">To</h1>
          <h1 className="text-7xl xl:hidden">Bookworm</h1>
          <h1 className="pt-24 text-6xl hidden xl:block sm:text-4xl">
            Welcome to Bookworm
          </h1>
          <p className="text-4xl pt-5 sm:text-2xl">Read books like bookworm!</p>
          <Link to="/all-books">
            <button type="button" className="btn btn-secondary mt-5">
              Browse all books &rarr;
            </button>
          </Link>
        </section>

        <section className="w-2/5 xl:w-full xl:mt-[100px] z-0 order-2 xl:order-1">
          <div className="bg-secondary h-full min-h-[50vh] xl:min-h-[40vh] relative md:w-[80%] md:mx-auto">
            <div className="absolute -top-24 left-1/2 z-10 max-w-xs xsm:-top-5">
              <img
                src={heroBook1}
                alt="Power of habit"
                className="w-4/5 md:max-w-[300px] sm:w-[200px] xsm:w-[150px]"
              />
            </div>
            <div className="absolute top-24 left-20 z-1 sm:left-3 h-auto xsm:top-44">
              <img
                src={heroBook2}
                alt="Eat that frog"
                className="w-4/5 max-w-sm xl:max-h-[420px] sm:max-w-[250px] xsm:w-[150px]"
              />
            </div>
            <img
              src={frame5}
              alt="frame1"
              className="absolute -top-16 -left-20 w-60 sm:hidden"
            />
            <img
              src={frame6}
              alt="frame1"
              className="absolute -bottom-16 -right-5 w-60 md:-right-16 sm:hidden"
            />
          </div>
        </section>
      </div>

      {isLoading ? <p>Loading...</p> : null}
      <h2 className="text-center py-10 text-5xl lg:text-3xl md:text-2xl">
        Latest books
      </h2>
      <section className="sm:px-0 grid grid-cols-4 xxl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-6 xxl:gap-5 xl:gap-4 md:gap-3 sm:gap-6 pb-20">
        {data?.data?.map((book: IBook) => (
          <BookCard key={book._id} data={book} />
        ))}
      </section>
      <div className="flex justify-center">
        <Link to="/all-books">
          <button className="btn btn-success btn-lg mb-20" type="button">
            Browse All Books
          </button>
        </Link>
      </div>
    </Layout>
  );
}
