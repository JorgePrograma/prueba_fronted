import React from 'react';
import { useAuth } from '../context/ContextProvider';
import axiosClient from '../utilies/axios-client';
import CardsLocation from './CardsLocation';

function CardsDetalles({ datos }) {
  const { user } = useAuth();
  console.log(user)

  const handleEnvio = () => {
    const data = {
      ref_api: datos.id,
      user_id: user.id,
    }

    axiosClient.get('/sanctum/csrf-cookie').then(response => {
      axiosClient.post('api/crear', data)
        .then(({ data }) => {
            console.log(data)
        })
        .catch((err) => {
          const response = err.response;
        })
    });
  }

  return (
    <div className='flex sm:flex-row flex-col items-center justify-center gap-24'>
      <img src={datos.image} className="w-80 bg-red-400 rounded-2xl border-4 border-slate-400" />
      <div className='flex flex-col gap-5'>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Nombre</strong> {datos.name}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Status</strong> {datos.status}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Especies</strong> {datos.species}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Gender</strong> {datos.gender}</p>
        <button className='p-3 border rounded-md' onClick={handleEnvio}>guardar</button>
      </div>
    </div>
  );
}

export default CardsDetalles;
