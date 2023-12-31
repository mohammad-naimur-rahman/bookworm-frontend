/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { BsFillSunFill, BsMoonStars, BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { removeFromReadingList } from '../redux/features/readingList/readingListSlice';
import { logoutUser, setUser } from '../redux/features/user/userSlice';
import { removeFromWishlist } from '../redux/features/wishlist/wishlistSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import logo from '@/assets/logo/bookorm-logo.png';

export default function Nav() {
  const {
    user: { name, email },
  } = useAppSelector((state) => state.user);

  const initLocalUserData = { name: '', email: '' };

  const [localUser, setlocalUser] = useState(initLocalUserData);

  useEffect(() => {
    if (name && email) {
      setlocalUser({ name, email });
    }
  }, [name, email]);

  const { total, books } = useAppSelector((state) => state.wishlist);
  const { total: totalReadingListBooks, books: readingListBooks } =
    useAppSelector((state) => state.readingList);

  const dispatch = useAppDispatch();
  const themeValue = localStorage.getItem('theme');
  const [theme, settheme] = useState(themeValue || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setUser({ name: '', email: '', id: '' }));
    localStorage.clear();
    setlocalUser(initLocalUserData);
  };

  const [scrollYValue, setScrollYValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollYValue(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar pl-8 fixed top-0 left-0 w-full z-10 drawer flex justify-between ${
        scrollYValue > 0
          ? 'shadow-lg backdrop-blur-md bg-base-100 bg-opacity-50'
          : ''
      }`}
    >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="navbar-start md:w-20">
        <Link to="/">
          <div className="flex items-center cursor-pointer">
            <img src={logo} alt="bookworm" className="w-20 h-auto" />
            <p className="text-secondary text-3xl italic ml-3 font-bold md:hidden">
              Bookworm
            </p>
          </div>
        </Link>
      </div>
      <div className="navbar-center lg:hidden">
        <ul className="flex">
          <li className="mx-3">
            <Link to="/">Homepage</Link>
          </li>
          <li className="mx-3">
            <Link to="/all-books">All Books</Link>
          </li>
          {email ? (
            <li className="mx-3">
              <Link to="/add-new-book">Add new book</Link>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="navbar-end md:w-[calc(100%_-_80px)]">
        <div className="flex items-center xsm:hidden">
          <BsFillSunFill />
          <input
            type="checkbox"
            className="toggle mx-2"
            onChange={() => {
              settheme(theme === 'night' ? 'light' : 'night');
            }}
            checked={theme === 'night'}
          />
          <BsMoonStars />
        </div>
        <div className="dropdown dropdown-end ml-5">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

              <span className="badge badge-sm indicator-item">{total}</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-60 bg-base-100 shadow xxsm:-left-10"
          >
            <div className="card-body">
              {books?.map((book) => (
                <div key={book._id} className="w-full">
                  <div className="flex justify-between items-center w-full">
                    <p>{book.title}</p>
                    <div className="text-right cursor-pointer">
                      <button
                        type="button"
                        className="btn w-[48px] h-[35px] max-h-[35px] rounded-full p-0 text-lg"
                        onClick={() => dispatch(removeFromWishlist(book))}
                      >
                        <BsX />
                      </button>
                    </div>
                  </div>
                  <span className="divider my-1" />
                </div>
              ))}
              <div className="card-actions">
                <Link to="/wishlist" className="block w-full">
                  <button className="btn btn-primary btn-block" type="button">
                    View Wishlist
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM9 19H7V5h2v14zm6 0h-2V5h2v14zm4 0h-2V5h2v14z" />
              </svg>

              <span className="badge badge-sm indicator-item">
                {totalReadingListBooks}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow xsm:-left-40"
          >
            <div className="card-body">
              {readingListBooks?.map((book) => (
                <div key={book.book._id} className="w-full">
                  <div className="flex justify-between items-center w-full">
                    <p>{book.book.title}</p>
                    <div className="flex items-center">
                      <span className="mr-2 border-[1px] rounded-full py-1 px-2 min-w-[max-content]">
                        {book.status}
                      </span>
                      <div className="text-right cursor-pointer">
                        <button
                          type="button"
                          className="btn w-[48px] h-[35px] max-h-[35px] rounded-full p-0 text-xl"
                          onClick={() => {
                            dispatch(removeFromReadingList(book.book));
                          }}
                        >
                          <BsX />
                        </button>
                      </div>
                    </div>
                  </div>
                  <span className="divider my-1" />
                </div>
              ))}
              <div className="card-actions">
                <Link to="/reading-list" className="block w-full">
                  <button className="btn btn-primary btn-block" type="button">
                    View Reading List
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.69 2 6 4.69 6 8c0 1.77.66 3.37 1.76 4.62C6.34 13.14 4 15.6 4 19h16c0-3.4-2.34-5.86-3.76-6.38C17.34 11.37 18 9.77 18 8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 16c2.97 0 5.45-1.77 6.55-4.31C18.94 16.08 16.66 18 14 18c-2.41 0-4.47-1.47-5.37-3.55C6.55 14.23 9.03 16 12 16z" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {localUser.name ? (
              <li className="pb-2 pl-2 font-semibold">{localUser.name}</li>
            ) : null}
            {localUser.email ? (
              <li className="pl-2 italic">{localUser.email}</li>
            ) : null}
            {localUser.email ? <div className="divider" /> : null}
            {email ? (
              <li onClick={handleLogout}>
                <a>logout</a>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <label
          tabIndex={0}
          htmlFor="my-drawer"
          className="btn btn-ghost btn-circle hidden lg:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="my-drawer" className="drawer-overlay" />
        <ul className="menu p-4 w-60 h-full bg-base-200 text-base-content">
          <li className="mx-3 text-2xl text-center text-secondary font-bold italic">
            Bookworm
          </li>
          <div className="divider" />
          <div className="hidden items-center xsm:flex mx-auto">
            <BsFillSunFill />
            <input
              type="checkbox"
              className="toggle mx-2"
              onChange={() => {
                settheme(theme === 'night' ? 'light' : 'night');
              }}
              checked={theme === 'night'}
            />
            <BsMoonStars />
          </div>
          <div className="divider hidden xsm:flex" />
          <li className="mx-3 text-lg">
            <Link to="/">Homepage</Link>
          </li>
          <li className="mx-3 text-lg">
            <Link to="/all-books">All Books</Link>
          </li>
          {email ? (
            <li className="mx-3 text-lg">
              <Link to="/add-new-book">Add new book</Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}
