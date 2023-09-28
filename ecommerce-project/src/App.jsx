import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login, 
  Checkout,
  Orders,
} from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as ordersLoader } from './pages/Orders';


// actions
import { action as loginAction } from './pages/Login';
import { action as checkoutAction } from './components/CheckoutForm';

import { store } from './store';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),


      },
      {
        path: 'orders',
        element: <Orders />,
        loader: ordersLoader(store),

      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;


