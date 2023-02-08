import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../components/contents/DefaultLayout';
import GuestLayout from '../components/contents/GuestLayout';
import Localization from '../components/Localization';
import Ajuste from '../pages/Ajuste';
import Detalles from '../pages/Detalles';
import Favoritos from '../pages/Favoritos';
import Inicio from '../pages/Inicio';
import Lista from '../pages/Lista';
import Loguin from '../pages/Loguin';
import NotFound from '../pages/NotFound';
import Personajes from '../pages/Personajes';
import Registrarse from '../pages/Registrarse';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/inicio" />
      },
      {
        path: '/personajes/:categoria',
        element: <Personajes />
      },
      {
        path: '/personajes',
        element: <Lista />
      },
      {
        path: '/detalles/:id',
        element: <Detalles />
      },
      {
        path: '/localitation/:id',
        element: <Localization />
      },
      {
        path: '/inicio',
        element: <Inicio />
      },
      {
        path: '/favoritos',
        element: <Favoritos />
      },
      {
        path: '/ajustes',
        element: <Ajuste />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Loguin />
      },
      {
        path: '/registrarse',
        element: <Registrarse />
      }
    ]
  }
])

export default router;
