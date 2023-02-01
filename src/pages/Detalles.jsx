import React, { useEffect, useState } from 'react';
import CardsDetalles from '../components/CardsDetalles';
import Episodios from '../components/Episodios';

function Detalles() {
  const [buscar, setBuscar] = useState("character/2");
  const [data, setData] = useState([]);

  const fetchBusqueda = async () => {
    await fetch(`https://rickandmortyapi.com/api/${buscar}`)
      .then(response => response.json()).
      then(datos => {
        const my = datos;
        setData(my)
      }).
      catch(error => console.log(error))
  }


  useEffect(() => {
    fetchBusqueda();
    console.log("efect")
    console.log(data);
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-20 mt-10'>
        <CardsDetalles datos={data} />
        <Episodios />
      </div>
    </div>
  );

}

export default Detalles;
