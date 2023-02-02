import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from "../../utilies/axios-client";
import Navbar from '../Navbar';

function DefaultLayout() {
  const {token } = useStateContext();

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
