import React from 'react';
import { useParams } from 'react-router-dom';
import Favoritos from './Favoritos';
import Lista from './Lista';

function Personajes() {
  const { categoria } = useParams();

  return (
    <>
      {categoria === "favoritos" ? <Favoritos /> : <Lista />}
    </>
  );
}

export default Personajes;
