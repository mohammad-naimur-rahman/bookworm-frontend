import { createBrowserRouter } from 'react-router-dom';

import CreateBook from '../pages/CreateBook';
import Homepage from '../pages/Homepage';

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/create-book', element: <CreateBook /> },
]);

export default router;
