import React, { useEffect, useState } from 'react';
import CardsCharacter from '../components/CardsCharacter';
import Cargando from '../components/Cargando';
import { useAuth } from '../context/ContextProvider';
import axiosClient from '../utilies/axios-client';
import { URL } from '../utilies/Utilidades';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([])
  const { user } = useAuth();
  const [estado, setEstado] = useState(true);

  const getFavoritos = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      const { data } = await axiosClient.get(`api/user/favoritos/${user.id}`);
      const promises = data.map(item => fetch(`${URL}/character/${item.ref_api}`))
      const responses = await Promise.all(promises);
      const characters = await Promise.all(responses.map(responses => responses.json()))
      setFavoritos(characters)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFavoritos()
  }, [estado])

  const Render = () => {
    const no_encontrado = <div className='flex items-center h-1/2 py-3 text-2xl justify-center mt-24'>No hay personajes que mostrar</div>;
    if (favoritos) {
      if (favoritos.length > 0) {
        return <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 bg-slate-100'>
          {favoritos.map((item, index) => (
            <div key={index}>
              <CardsCharacter dato={item} estado={estado} setEstado={setEstado} />
            </div>
          ))}
        </div>
      } else {
        return <Cargando/>
      }

    }
    return no_encontrado;
  };

  return (
    <div className='flex flex-col mx-2 h-full'>
      <h2 className='font-bold text-3xl py-2 mx-3'>Mi lista de personajes favoritos de la serie rick and morty</h2>
      <div className=''>
        {Render()}
      </div>
    </div>
  );
}

export default Favoritos;
