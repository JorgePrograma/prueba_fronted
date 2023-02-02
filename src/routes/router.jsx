import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../components/contents/DefaultLayout';
import GuestLayout from '../components/contents/GuestLayout';
import Detalles from '../pages/Detalles';
import Lista from '../pages/Lista';
import Loguin from '../pages/Loguin';
import NotFound from '../pages/NotFound';
import Registrarse from '../pages/Registrarse';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/lista"/>
      },
      {
        path: '/lista',
        element: <Lista/>
      },
      {
        path: '/detalles/:id',
        element: <Detalles />
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Loguin/>
      },
      {
        path: '/registrarse',
        element: <Registrarse/>
      }
    ]
  }
])

export default router;
