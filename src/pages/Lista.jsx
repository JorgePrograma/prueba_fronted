import React, { useEffect, useState } from 'react';
import CardsCharacter from '../components/CardsCharacter';
import CardsLocation from '../components/CardsLocation';
import { URL } from '../utilies/Utilidades';

function Lista() {
  const [buscar, setBuscar] = useState("character");
  const [data, setData] = useState([]);
  const [page, setpage] = useState(1)
  const [counPage, setCounPage] = useState(10);

  const fetchBusqueda = async () => {
    await fetch(`${URL}${buscar}`)
      .then(response => response.json()).
      then(datos => {
        setData(datos.results);
        setCounPage(datos.info.pages)
      }).
      catch(error => console.log(error))
  }

  const fetchPagina = async () => {
    await fetch(`${URL}${buscar}/?page=${page}`)
      .then(response => response.json()).
      then(datos => {
        setData(data.concat(datos.results));
      }).
      catch(error => console.log(error))
  }

  useEffect(() => {
    fetchPagina()
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page])

  useEffect(() => {
    fetchBusqueda()
  }, [buscar])

  function character() {
    return (
      data.map((item, index) => (
        <div key={index} >
          {buscar === "character" ? <CardsCharacter dato={item} /> : <CardsLocation dato={item} />}
        </div>
      ))
    )
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      if (page < counPage) {
        setpage(page + 1);
      }
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex shadow p-2 ml-3 mt-5 gap-4 justify-center items-center'>
        <p className='font-bold text-2xl'>Filtro</p>
        <ul className='flex mx-2 gap-5'>
          <li className={`border p-2 rounded-md ${buscar === "character" ? "bg-slate-300" : ""}`} onClick={() => setBuscar("character")}>characters</li>
          <li className={`border p-2 rounded-md ${buscar === "location" ? "bg-slate-300" : ""}`} onClick={() => setBuscar("location")}>locations</li>
          <li className={`border p-2 rounded-md ${buscar === "episode" ? "bg-slate-300" : ""}`} onClick={() => setBuscar("episode")}>episodes</li>
        </ul>
      </div>
      <div className={`${buscar === "character" ? "grid grid-cols-5" : buscar === "location" ? "grid grid-cols-2" : ""} `} onScroll={handleScroll}>
        {character()}
      </div>
    </div>
  );
}

export default Lista;
