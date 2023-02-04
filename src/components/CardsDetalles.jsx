import React from 'react';
import swal from 'sweetalert';
import { useAuth } from '../context/ContextProvider';
import axiosClient from '../utilies/axios-client';

function CardsDetalles({ datos }) {
  const { user } = useAuth();

  const handleEnvio = () => {
    const data = {
      ref_api: datos.id,
      user_id: user.id,
    }

    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        return axiosClient.post('api/crear', data)
      })
      .then(({ data }) => {
        const mensaje = data.mensaje
        swal(mensaje, "", "success");
      })
      .catch(error => {
        const status = error.response.status
        if (status === 409) {
          const mensaje = error.response.data.mensaje
          swal(mensaje, "Agregue otro nuevo", "info");
        }
      });

  }

  return (
    <div className='flex sm:flex-row flex-col items-center justify-center gap-24'>
      <img src={datos.image} alt={datos.name} className="w-80 bg-red-400 rounded-2xl border-4 border-slate-400" />
      <div className='flex flex-col gap-5'>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Nombre</strong> {datos.name}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Status</strong> {datos.status}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Especies</strong> {datos.species}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Gender</strong> {datos.gender}</p>
        <button className='p-3 border rounded-2xl text-2xl font-bold hover:bg-indigo-400' onClick={handleEnvio}>guardar</button>
      </div>
    </div>
  );
}

export default CardsDetalles;
