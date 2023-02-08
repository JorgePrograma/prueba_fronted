import axiosClient from '../utilies/axios-client';
import { useStateContext } from '../context/ContextProvider.jsx'
import React, { useState } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function Loguin() {

  const [cuenta, setCuenta] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState(null);
  const { setUser, setToken } = useStateContext();
  const [verPassword, setverPassword] = useState(true);

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

    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        return axiosClient.post('api/loguin', data).then(({ data }) => {
          setUser(data.usuario)
          setToken(data.acess_token);
          const mensaje = data.mensaje
          swal("Exitoso", mensaje, "success");
        })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
              if (response.data.mensaje) {
                setMensaje(response.data.mensaje);
              }
            }
          })
      });

  }

  const handlePass1 = () => {
    setverPassword(!verPassword);
  }


  return (
    <div className='flex h-screen w-full items-center justify-center flex-col bg-gradient-to-r from-slate-400 to-blue-500'>
      <div className='w-2/5 p-10 border rounded-md'>
        <h2 className='text-4xl font-bold mb-5 text-center'>Iniciar sesion</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 border shadow rounded-md mx-2 p-6 '>
            <div className="w-full flex flex-col gap-2">
              <label className='font-bold text-lg'>Email</label>
              <input className='border rounded-md p-2' name='email' type="email" onChange={handleChange} />
            </div>

            <div className="w-full flex flex-col">
              <label className='font-bold text-lg'>Password</label>
              <div className='flex border rounded-md items-center bg-white'>
                <input className=' p-2 outline-none flex-1' name="password" type={`${verPassword ? "password" : "text"}`} onChange={handleChange} />
                <label className={`mx-2 hover:cursor-pointer`} onClick={handlePass1}>{verPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</label>
              </div>
            </div>

            <div>
              {mensaje !== "" ? (<p className='text-red-500 '>{mensaje} </p>) : ""}
            </div>
            <div className='flex'>
              <button className="flex-1 border text-center text-white font-serif text-xl bg-green-500 rounded-md p-2 hover:bg-green-400" type='submit'>Enviar</button>
              <Link to="/registrarse" className="font-serif underline underline-offset-8 text-white text-lg hover:text-blue-700 rounded-md p-2 mx-5" type='submit'>registrarse</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loguin;
