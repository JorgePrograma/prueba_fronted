import React, { useEffect, useState } from 'react';
import { URL } from '../utilies/Utilidades';
import CardsEpisodios from './CardsEpisodios';

function Episodios({dato}) {
  const [buscar, setBuscar] = useState("episode/1");
  const [data, setData] = useState([]);

  const fetchBusqueda = async () => {
    await fetch(`${URL}/episode/${buscar}`)
      .then(response => response.json()).
      then(datos => {
        const my = datos;
        setData(my)
      }).
      catch(error => console.log(error))
  }


  useEffect(() => {
    fetchBusqueda();
  }, [])

  return (
    <div className='flex flex-col'>
      <div>
      {}
        <CardsEpisodios dato={data}/>
      </div>
    </div>
  );
}

export default Episodios;