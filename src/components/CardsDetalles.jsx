import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

function CardsDetalles({ datos }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [datos.location]);


  return loading ? (<div className='flex sm:flex-row flex-col items-center justify-center'>
    <p>Cargando...</p>
  </div>
  ) : (
    <div className='flex sm:flex-row flex-col items-center justify-center gap-24'>
      <div className='flex flex-col'>
        <img src={datos.image} alt={datos.name} className="w-96 h-96 rounded-2xl border-4 border-slate-400" />
      </div>

      <div className='flex flex-col gap-2 mx-4'>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Name</strong> {datos.name}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Status</strong> {datos.status}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Especies</strong> {datos.species}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Type</strong> {datos.type}</p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Gender</strong> {datos.gender}</p>
        <Link to={`../localitation/${!datos.origin ? "" : (datos.origin.url).split("/")[5]}`} className='text-4xl font-serif font-bold'>
          Origin
          <strong className='font-normal mr-3 mx-3 hover:underline hover:underline-offset-8'>{!datos.origin ? "" : datos.origin.name}</strong>
        </Link>
        <Link to={`../localitation/${!datos.location ? "" : (datos.location.url).split("/")[5]}`} className='text-4xl font-serif font-bold'>
          Localizacion
          <strong className='font-normal mr-3 mx-3 hover:underline hover:underline-offset-8'>{!datos.location ? "" : datos.location.name}</strong>
        </Link>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Episodios disponibles</strong>
          {!datos.episode ? "" : datos.episode.length}
        </p>
        <p className='text-4xl font-serif'><strong className='font-bold text-4xl mr-3'>Created</strong> {datos.created}</p>
      </div>
    </div>)
}

export default CardsDetalles;
