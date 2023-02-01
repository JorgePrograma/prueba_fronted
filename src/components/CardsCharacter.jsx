import React from 'react'

const CardsCharacter = ({dato}) => {
  return (
    <div className={`flex flex-col shadow m-2 rounded-md hover:bg-slate-300`} onClick={()=>{alert(dato.name)}}>
      <div className='mt-5 hover:opacity-75 cursor-pointer relative'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <img src={dato.image} alt={dato.name} className="flex w-40 h-40 rounded-full  hover:translate-x-5 hover:duration-150" />
          <p className='font-bold text-xl text-center'>{dato.name}</p>
        </div>
        <div className='px-2 font-semibold mt-2 bg-slate-100 flex gap-3 items-center justify-center'>
          <p className='px-2'>Genero <span className='font-normal'> {dato.gender}</span></p>
        </div>
      </div>
    </div>
  );
}

export default CardsCharacter
