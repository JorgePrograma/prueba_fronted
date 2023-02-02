import React, { useState } from 'react';
import axiosClient from '../utilies/axios-client';
import { useAuth, useStateContext } from '../context/ContextProvider.jsx'
import swal from 'sweetalert';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';


function Registrarse() {

  const [usuario, setUsuario] = useState({ nombres: "", apellidos: "", cedula: "", email: "", password: "", password_confirmation: "" });
  const { setUser, setToken } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const [verPassword, setverPassword] = useState(true);
  const [verPasswordConfirmation, setverPasswordConfirmation] = useState(true);

  const handleChange = (e) => {
    setUsuario(({ ...usuario, [e.target.name]: e.target.value }))
  };

  const handleSubmit = eve => {
    eve.preventDefault();
    if (!usuario.cedula || !usuario.nombres || !usuario.apellidos || !usuario.email || !usuario.password || !usuario.password_confirmation) {
      setMensaje("LLene todo los campos");
      return;
    } if (usuario.password !== usuario.password_confirmation) {
      setMensaje("Los passsword nos coinciden");
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
        .then(({ data }) => {
          setUser(data.usuario)
          setToken(data.acess_token);
          swal(data.mensaje, "success");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.mensaje.cedula) {
              setMensaje(response.data.mensaje.cedula[0]);
            } else if (response.data.mensaje.email) {
              setMensaje(response.data.mensaje.email[0])
            }
          }
        })
    });

  }

  const handlePass1 = () => {
    setverPassword(!verPassword);
  }

  const handlePass2 = () => {
    setverPasswordConfirmation(!verPasswordConfirmation);
  }

  return (
    <div className='flex h-screen w-full items-center justify-center flex-col bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500'>
      <h2 className='text-4xl font-bold my-2'>Bienvenidos</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4 border shadow rounded-md px-5 py-4'>

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
            <div className='flex border rounded-md items-center bg-white'>
              <input className=' p-2 outline-none flex-1' name="password" type={`${verPassword ? "password" : "text"}`} onChange={handleChange} />
              <label className={`mx-2 hover:cursor-pointer`} onClick={handlePass1}>{verPassword ? "ver" : "ocultar"}</label>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Confirme password</label>
            <div className='flex border rounded-md items-center bg-white'>
              <input className=' p-2 outline-none flex-1' name="password_confirmation" type={`${verPasswordConfirmation ? "password" : "text"}`} onChange={handleChange} />
              <label className={`mx-2 hover:cursor-pointer`} onClick={handlePass2}>{verPasswordConfirmation ? "ver" : "ocultar"}</label>
            </div>          </div>
          <div>
            {mensaje !== "" ? (<p className='text-red-500 '>{mensaje} </p>) : ""}
          </div>

          <div className='flex col-span-2 justify-between'>
            <button className="text-center text-white w-72 font-serif text-xl bg-green-500 rounded-md p-2" type="submit" >Enviar</button>
            <Link to="/loguin" className="font-serif underline underline-offset-8 text-lg text-white hover:text-blue-700 rounded-md p-2" type='submit'>Tengo una cuenta</Link>
          </div>
        </div>

      </form>

    </div>
  );
}

export default Registrarse;
