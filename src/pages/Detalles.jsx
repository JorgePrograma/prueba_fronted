import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardsDetalles from '../components/CardsDetalles';
import { URL } from '../utilies/Utilidades';

function Detalles() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchBusqueda = async () => {
    await fetch(`${URL}/character/${id}`)
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
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col gap-20 mt-10'>
        <CardsDetalles datos={data} />
      </div>
    </div>
  );

}

export default Detalles;
