import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL } from '../utilies/Utilidades';
import CardsCharacter from './CardsCharacter';
import CardsLocation from './CardsLocation';
import Cargando from './Cargando';

function Localization() {
  const { id } = useParams();
  const [dataLocation, setDataLocalitation] = useState([]);
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    getLocalitation()
  }, [])

  const getLocalitation = async () => {
    try {
      const response = await fetch(`${URL}/location/${id}`);
      const data = await response.json();
      setDataLocalitation(data);
      if (data) {
        const promises = data.residents.map(async (id) => {
          const nuevoId = id.split("/")[5];
          return await fetch(`${URL}/character/${nuevoId}`).then(res => res.json());
        });
        const results = await Promise.all(promises);
        setPersonajes(results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-20 w-full'>
      <p className='font-bold text-4xl'>Locations </p>
      <CardsLocation dato={dataLocation} />
      <p>Personajes que podemos ver en el episodio</p>
      <div className='grid grid-cols-4 w-full bg-slate-100'> {
        personajes.length > 0 ? (personajes.map((personaje, id) => (
          <div key={id}>
            <CardsCharacter dato={personaje} />
          </div>
        ))) : <div className='col-span-4'><Cargando /></div>
      }
      </div>
    </div>
  );
}

export default Localization;
