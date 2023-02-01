import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardsCharacter from '../components/CardsCharacter';
import { URL } from '../utilies/Utilidades';

function Lista() {
  const [buscar, setBuscar] = useState("character");
  const [data, setData] = useState([]);

  const fetchBusqueda = () => {
    fetch(`https://rickandmortyapi.com/api/${buscar}`)
      .then(response => response.json()).
      then(datos => {
        setData(datos.results)
      }).
      catch(error => console.log(error))
  }


  useEffect(() => {
    fetchBusqueda()
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='flex shadow p-2 ml-3 mt-5 gap-4 justify-center items-center'>
        <p className='font-bold text-2xl'>Filtro</p>
        <ul className='flex mx-2 gap-5'>
          <li className='border p-2 rounded-md'><Link to="/">characters</Link></li>
          <li className='border p-2 rounded-md'><Link to="/">locations</Link></li>
          <li className='border p-2 rounded-md'><Link to="/">episodes</Link></li>
        </ul>
      </div>
      <div className='grid grid-cols-5'>
        {data.map((item, index) => (
          <div key={index}>
            <CardsCharacter dato={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lista;
