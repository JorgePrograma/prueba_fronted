import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from "../../utilies/axios-client";
import Navbar from '../Navbar';

function DefaultLayout() {
  const { token, setUser } = useStateContext();

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <div className=''>
      <Navbar />
      <main className='w-full h-full'>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
