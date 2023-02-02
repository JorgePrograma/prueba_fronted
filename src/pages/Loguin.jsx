import axiosClient from '../utilies/axios-client';
import { useStateContext } from '../context/ContextProvider.jsx'
import React, { useState } from 'react';
import swal from 'sweetalert';

function Loguin() {

  const [cuenta, setCuenta] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState(null);
  const { setUser, setToken } = useStateContext();

  const handleChange = (e) => {
    setCuenta(({ ...cuenta, [e.target.name]: e.target.value }))
  };

  const handleSubmit = async (eve) => {
    eve.preventDefault();
    if (!cuenta.email || !cuenta.password) {
      setMensaje("LLene todo los campos");
      return;
    }
    setMensaje("")

    const data = {
      email: cuenta.email,
      password: cuenta.password
    }

    axiosClient.get('/sanctum/csrf-cookie').then(response => {
      axiosClient.post('api/login', data)
        .then(({ data }) => {
          swal(data.mensaje, "felicidades has creado tu cuenta!", "success");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
          }
        })
    });




  }

  return (
    <div className='flex h-screen w-full items-center justify-center flex-col'>
      <h2 className='text-4xl font-bold bg-white my-2'>Iniciar sesion</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 border shadow rounded-md mx-2 p-2'>
          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Correo</label>
            <input className='border rounded-md p-2' name='email' onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Password</label>
            <input className='border rounded-md p-2' name='password' type="password" onChange={handleChange} />
          </div>

          <div className='flex w-72 items-center justify-center'>
            <button className="flex-1 border text-center text-white font-serif text-xl bg-green-500 rounded-md p-2" type='submit'>Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Loguin;
