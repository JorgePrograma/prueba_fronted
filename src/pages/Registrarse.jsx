import React, { useState } from 'react';
import axiosClient from '../utilies/axios-client';
import { useAuth } from '../context/ContextProvider.jsx'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function Registrarse() {

  const [usuario, setUsuario] = useState(
    {
      name: "", email: "", city: "", password: "", password_confirmation: ""
    });
  const { setUser, setToken } = useAuth();
  const [mensaje, setMensaje] = useState("");
  const [verPassword, setverPassword] = useState(true);
  const [verPasswordConfirmation, setverPasswordConfirmation] = useState(true);

  const handleChange = (e) => {
    setUsuario(({ ...usuario, [e.target.name]: e.target.value }))
  };

  const handleSubmit = eve => {
    eve.preventDefault();
    if (!usuario.name || !usuario.email || !usuario.password || !usuario.password_confirmation) {
      setMensaje("LLene todo los campos");
      return;
    } if (usuario.password !== usuario.password_confirmation) {
      setMensaje("Password de confirmacion no es el mismo del password");
      return;
    }

    setMensaje("");

    const data = {
      name: usuario.name,
      email: usuario.email,
      city: usuario.city,
      password: usuario.password,
      password_confirmation: usuario.password_confirmation,
    }

    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        return axiosClient.post('api/registro', data)
      })
      .then(({ data }) => {
        const mensaje = data.mensaje
        setUser(data.usuario)
        setToken(data.acess_token);
        swal(mensaje, "", "success");
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 500) {
          if (response.data.mensaje.email) {
            setMensaje(response.data.mensaje.email[0]);
          }
          if (response.data.mensaje.password) {
            setMensaje(response.data.mensaje.password[0]);
          }
        }
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
          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Name</label>
            <input className='border rounded-md p-2' name='name' type="text" onChange={handleChange} required />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Email</label>
            <input className='border rounded-md p-2' name='email' type="email" onChange={handleChange} required />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>City</label>
            <input className='border rounded-md p-2' name='city' type="text" onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Password</label>
            <div className='flex border rounded-md items-center bg-white'>
              <input className=' p-2 outline-none flex-1' name="password" type={`${verPassword ? "password" : "text"}`} onChange={handleChange} required />
              <label className={`mx-2 hover:cursor-pointer`} onClick={handlePass1}>{verPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</label>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Confirmar Password</label>
            <div className='flex border rounded-md items-center bg-white'>
              <input className=' p-2 outline-none flex-1' name="password_confirmation" type={`${verPasswordConfirmation ? "password" : "text"}`} onChange={handleChange} required />
              <label className={`mx-2 hover:cursor-pointer`} onClick={handlePass2}>{verPasswordConfirmation ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</label>
            </div>
          </div>

          <div className='col-span-2'>
            {mensaje === "" ? "" : (<p className='500 border px-2 rounded-md  bg-red-500 text-2xl text-white '>{mensaje} </p>)}
          </div>
          <div className='col-span-2'>
            <div className='flex col-span-2 justify-between'>
              <button className="text-center text-white w-72 font-serif text-xl bg-green-500 rounded-md p-2" type="submit" >Enviar</button>
              <Link to="/loguin" className="font-serif underline underline-offset-8 text-lg text-white hover:text-blue-700 rounded-md p-2" type='submit'>Tengo una cuenta</Link>
            </div>
          </div>
        </div>


      </form>

    </div>
  );
}

export default Registrarse;
