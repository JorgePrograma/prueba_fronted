import React from 'react';

function CardsLocation({dato}) {
  return (
    <div className={`flex flex-col shadow m-2 rounded-md hover:bg-slate-300`} onClick={() => { alert(dato.name) }}>
      <div className='mt-5 hover:opacity-75 cursor-pointer relative'>
        <div className='px-2 font-semibold mt-2 bg-slate-100 flex gap-3 items-center justify-center'>
          <p className='px-2'>Genero <span className='font-normal'> {dato.dimension}</span></p>
        </div>
      </div>
    </div>
  );
}

export default CardsLocation;
