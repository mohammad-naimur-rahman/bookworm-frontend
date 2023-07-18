import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import CreateBook from '../pages/CreateBook';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import ReadingList from '../pages/ReadingList';
import Signup from '../pages/Signup';
import UpdateBook from '../pages/UpdateBook';
import Wishlist from '../pages/Wishlist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/create-book',
    element: (
      <ProtectedRoute>
        <CreateBook />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/all-books',
    element: <AllBooks />,
  },
  {
    path: '/book-details/:id',
    element: <BookDetails />,
  },
  {
    path: '/update-book/:id',
    element: <UpdateBook />,
  },
  {
    path: '/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/reading-list',
    element: <ReadingList />,
  },
]);

export default router;
