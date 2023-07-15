import { createBrowserRouter } from 'react-router-dom';

import CreateBook from '../pages/CreateBook';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/create-book', element: <CreateBook /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

export default router;
