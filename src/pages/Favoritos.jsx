import React, { useEffect, useState } from 'react';
import CardsCharacter from '../components/CardsCharacter';
import { useAuth } from '../context/ContextProvider';
import axiosClient from '../utilies/axios-client';
import { URL } from '../utilies/Utilidades';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([])
  const { user } = useAuth();

  const getFavoritos = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      const { data } = await axiosClient.get(`api/lista/user/${user.id}`);

      const promises = data.map(item => fetch(`${URL}/character/${item.id}`))
      const responses = await Promise.all(promises);
      const characters = await Promise.all(responses.map(responses => responses.json()))
      setFavoritos(characters)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFavoritos()
  }, [])

  return (
    <div className='flex'>
      <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5'>
        {favoritos.map((personaje, index) => (
          <CardsCharacter key={index} dato={personaje} />
        ))}
      </div>
    </div>
  );
}

export default Favoritos;
