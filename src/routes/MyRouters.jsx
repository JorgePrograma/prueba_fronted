import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detalles from '../pages/Detalles';
import Lista from '../pages/Lista';
import Registrarse from '../pages/Registrarse';

function MyRouters() {
  return (
      <Routes>
        <Route exact path="/" element={<Lista />} />
        <Route exact path="/registrarse" element={<Registrarse />} />
        <Route exact path="/Detalles/:id" element={<Detalles />} />
        <Route exact path="/lista" element={<Lista />} />
      </Routes>
  );
}


export default MyRouters;
