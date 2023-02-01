import React from 'react';

function CardsEpisodios({ dato }) {
  return (
    <div className='mx-10 font-sans text-4xl flex gap-10 flex-wrap items-center justify-center'>
      <p className='flex'> <span className='uppercase'>episodio : </span> {dato.episode}</p>
      <p className='flex'> <span className='uppercase'>air date : </span> {dato.air_date}</p>
      <p className='flex'> <span className='uppercase'>name : </span> {dato.name}</p>
    </div>
  );
}

export default CardsEpisodios;
