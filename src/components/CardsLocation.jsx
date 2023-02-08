import React from 'react';
import { Link } from 'react-router-dom';

function CardsLocation({ dato }) {
  let a = "";
  return (
    <div className={`flex flex-col shadow m-2 rounded-md hover:bg-slate-300 bg-white`}>
      <div className='flex-col flex p-2 '>
        <p className='font-bold text-xl flex gap-3'>nombre <span className='font-normal'> {dato.name}</span></p>
        <p className='font-bold text-xl flex gap-3'>Tipo <span className='font-normal'> {dato.type}</span></p>
        <p className='font-bold text-xl flex gap-3'>dimension <span className='font-normal'> {dato.dimension}</span></p>
        <Link to={`../localitation/${!dato.name ? "" : (dato.url).split("/")[5]}`} className="font-bold text-xl flex gap-3 underline">
          Localizacion
          <strong className='font-normal'>{dato.name}</strong>
        </Link>
      </div>
    </div>
  );
}

export default CardsLocation;
