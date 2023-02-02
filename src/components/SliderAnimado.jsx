import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderItems } from '../utils/Data/constantespruebas';

function SliderAnimado() {
  const [indice, setIndice] = useState(0);
  const [selectData, setSelectData] = useState(sliderItems[0]);
  const [loading, setLoading] = useState("");

  const previus = () => {
    const nextIndex = indice > 0 ? indice - 1 : sliderItems.length - 1;
    setSelectData(sliderItems[nextIndex]);
    setIndice(nextIndex);
    setLoading("duration-1000 translate-x-0")
  }

  const next = () => {
    const nextIndex = indice < sliderItems.length - 1 ? indice + 1 : 0;
    setSelectData(sliderItems[nextIndex]);
    setIndice(nextIndex);
  }

  const cargando = () => {
    setLoading("duration-1000 -translate-x-20")
    setTimeout(300);
    setLoading("duration-1000 translate-x-0")
  }
  return (
    <div className='w-full h-screen flex relative overflow-hidden bg-blue-50 bg-gradient-to-t'>
      {/* card de carrusel */}
      <div className={`flex h-full transition-opacity`}>
        <div className={`w-screen h-screen flex items-center ${loading}`}>
          <div className='flex flex-1 h-full items-center'>
            <img className='h-4/5 ml-24' src={selectData.img} />
          </div>

          <div className='flex flex-col gap-6 flex-1 p-12'>
            <h2 className='font-bold text-6xl uppercase'>{selectData.title}</h2>
            <p className="my-0 text-3xl">{selectData.desc}</p>
            <div className="flex  gap-10">
              <button className='p-3 text-3xl bg-transparent hover:bg-blue-200 cursor-pointer border-2 border-gray-700 rounded-xl 
            hover:scale-y-125 hover:transition-all '
              >Comprar</button>
            </div>
          </div>
        </div>
      </div>

      {/* botones de siguiente y anterior */}
      <div className='absolute mx-2 h-14 w-14 bg-gray-500 rounded-full
       flex items-center justify-center top-0 bottom-0 m-auto z-2 opacity-50 
       cursor-pointer'onClick={() => previus()} >
        <AiOutlineArrowLeft />
      </div>

      <div className='absolute mx-2 h-14 w-14 bg-gray-500 rounded-full
       flex items-center justify-center top-0 bottom-0 m-auto z-2 opacity-50 
       cursor-pointer right-0' onClick={() => next()}>
        <AiOutlineArrowRight />
      </div>

    </div>
  );
}
export default SliderAnimado;