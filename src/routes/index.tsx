import { createBrowserRouter } from 'react-router-dom';

import AllBooks from '../pages/AllBooks';
import CreateBook from '../pages/CreateBook';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

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
]);

export default router;
