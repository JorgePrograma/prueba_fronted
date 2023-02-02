import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from "../../utilies/axios-client";
import Navbar from '../Navbar';

function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="login" />
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
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
