import React from 'react';

function CardsLocation({ dato }) {
  let a = "";
  return (
    <div className={`flex flex-col shadow m-2 rounded-md hover:bg-slate-300`}>
      <div className='flex-col flex p-2 '>
        <p className='font-bold text-xl flex gap-3'>nombre <span className='font-normal'> {dato.name}</span></p>
        <p className='font-bold text-xl flex gap-3'>Tipo <span className='font-normal'> {dato.type}</span></p>
        <p className='font-bold text-xl flex gap-3'>dimension <span className='font-normal'> {dato.dimension}</span></p>
        <p className='font-bold text-xl flex gap-3'>url <span className='font-normal'> {dato.url}</span></p>
      </div>
    </div>
  );
}

export default CardsLocation;
