import React, { useState } from 'react';
import axiosClient from '../utilies/axios-client';
import { useAuth, useStateContext } from '../context/ContextProvider.jsx'
import swal from 'sweetalert';


function Registrarse() {

  const [usuario, setUsuario] = useState({ nombres: "", apellidos: "", cedula: "", email: "", password: "", password_confirmation:"" });
  const {setUser, setToken} = useAuth();
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setUsuario(({ ...usuario, [e.target.name]: e.target.value }))
  };

  const handleSubmit = eve => {
    eve.preventDefault();
    if (!usuario.cedula || !usuario.nombres || !usuario.apellidos || !usuario.email || !usuario.password|| !usuario.password_confirmation) {
      setMensaje("LLene todo los campos");
      return;
    }

    setMensaje("");

    const data = {
      cedula: usuario.cedula,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      password: usuario.password,
      password_confirmation: usuario.password_confirmation,
    }

    axiosClient.get('/sanctum/csrf-cookie').then(response => {
      axiosClient.post('api/registro', data)
      .then(res => {
        swal("Registrado con exito", "felicidades has creado tu cuenta!", "success");
      }).catch(error => {
        console.log(error)
      })
    });
   
  }

  return (
    <div className='flex h-screen w-full items-center justify-center flex-col'>
      <p>{mensaje}</p>
      <h2 className='text-4xl font-bold bg-white my-2'>Bienvenidos</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-2 border shadow rounded-md mx-2 p-2'>

          <div className="w-96 flex flex-col">
            <label className='font-bold text-lg'>Cedula</label>
            <input className='border rounded-md p-2' name='cedula' type="number" onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Nombres</label>
            <input className='border rounded-md p-2' name='nombres' value={usuario.nombres} onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Apellidos</label>
            <input className='border rounded-md p-2' name='apellidos' onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Correo</label>
            <input className='border rounded-md p-2' name='email' type="email" onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Password</label>
            <input className='border rounded-md p-2' name='password' type="password" onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Confirme password</label>
            <input className='border rounded-md p-2 ' name="password_confirmation" type="password_confirmation" onChange={handleChange} />
          </div>

          <div className='flex w-72 items-center justify-center'>
            <button className="flex-1 border text-center text-white font-serif text-xl bg-green-500 rounded-md p-2" type="submit" >Enviar</button>
          </div>
        </div>

      </form>

    </div>
  );
}

export default Registrarse;
