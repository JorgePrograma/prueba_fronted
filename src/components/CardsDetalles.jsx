import React from 'react';
import CardsLocation from './CardsLocation';

function CardsDetalles({ datos }) {
  return (
    <div className='flex items-center justify-center gap-24'>
      <img src={datos.image} className="w-80 bg-red-400 rounded-2xl border-4 border-slate-400" />
      <div className='flex flex-col gap-5'>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Nombre</strong> {datos.name}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Status</strong> {datos.status}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Especies</strong> {datos.species}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Gender</strong> {datos.gender}</p>
      </div>
    </div>
  );
}

export default CardsDetalles;
