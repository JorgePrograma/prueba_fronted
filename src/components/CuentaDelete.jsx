import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import swal from 'sweetalert';
import { useAuth } from '../context/ContextProvider';
import axiosClient from '../utilies/axios-client';

function CuentaDelete() {

  const [password, setPassword] = useState({ password: "", password_confirmation: "" })
  const { user, setUser, setToken } = useAuth();
  const [verPassword, setVerPassword] = useState(true);
  const [verPasswordConfirmation, setverPasswordConfirmation] = useState(true);

  const handleChange = (e) => {
    setPassword(({ ...password, [e.target.name]: e.target.value }))
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const data = {
      password: password.password,
      password_confirmation: password.password_confirmation,
    }
    console.log(data)
    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        return axiosClient.post(`api/delete/${user.id}`, data)
      })
      .then(({ data }) => {
        const mensaje = data.mensaje
        setUser({})
        setToken(null)
        swal(mensaje, "", "success");
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 500) {
          if (response.data.mensaje.password) {
            const mensaje = response.data.mensaje.password[0];
            swal(mensaje,"", "error")
          }else{
            const mensaje = response.data.mensaje;
            swal(mensaje,"", "error")
          }
        }
      });
  }

  const handlePass1 = () => {
    setVerPassword(!verPassword);
  }

  const handlePass2 = () => {
    setverPasswordConfirmation(!verPasswordConfirmation);
  }

  return (
    <div className='flex flex-col mt-10 mb-20'>
      <h2 className='text-4xl font-bold my-2 mx-2'>Eliminar cuenta</h2>
      <div className='shadow border rounded-md py-5 px-5'>
        <form onSubmit={handleSubmit}>

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
          <button className="text-center text-white sm:w-72 font-serif text-xl bg-green-500 rounded-md p-2" type="submit" >Enviar</button>

        </form>
      </div>
    </div>

  );
}

export default CuentaDelete;
