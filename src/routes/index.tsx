import { createBrowserRouter } from 'react-router-dom';

import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import CreateBook from '../pages/CreateBook';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UpdateBook from '../pages/UpdateBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/create-book',
    element: <CreateBook />,
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
]);

export default router;
