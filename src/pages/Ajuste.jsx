import React, { useEffect, useState } from 'react';
import axiosClient from '../utilies/axios-client';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAuth } from '../context/ContextProvider';
import swal from 'sweetalert';
import CuentaDelete from '../components/CuentaDelete';
function Ajuste() {

  const { setUser, setToken, user } = useAuth();
  const [usuario, setUsuario] = useState(
    {
      name: "", email: "", city: "", address: "", birthdate: "", password: ""
    });

  const [mensaje, setMensaje] = useState("");
  const [verPassword, setverPassword] = useState(true);
  
  useEffect(() => {
    setUsuario({
      name: user.name || "",
      email: user.email || "",
      city: user.city || "",
      address: user.address || "",
      birthdate: user.birthdate || "",
      password: user.password || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setUsuario(({ ...usuario, [e.target.name]: e.target.value }))
  };

  const handleSubmit = eve => {
    eve.preventDefault();
    if (!usuario.name || !usuario.email) {
      setMensaje("LLene todo los campos");
      return;
    }
    setMensaje("");

    const data = {
      name: usuario.name,
      email: usuario.email,
      city: usuario.city,
      address: usuario.address,
      birthdate: usuario.birthdate,
      password: usuario.password,
    }

    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        return axiosClient.put(`api/update/${user.id}`, data)
      })
      .then(({ data }) => {
        const mensaje = data.mensaje
        setUser(data.usuario)
        swal(mensaje, "", "success");
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 500) {
          if (response.data.mensaje.email) {
            setMensaje(response.data.mensaje.email[0]);
          } else if (response.data.mensaje.date) {
            setMensaje(response.data.mensaje.date[0]);
          }
        }
      });
  }

  const handlePass1 = () => {
    setverPassword(!verPassword);
  }

  return (
    <div className='flex flex-col sm:mx-52 sm:mt-10'>
      <h2 className='text-4xl font-bold my-2 mx-2'>Ajustes de usuarios</h2>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col sm:grid grid-cols-2  gap-4 border shadow rounded-md px-5 py-4'>
          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Name</label>
            <input className='border rounded-md p-2' name='name' value={usuario.name} type="text" onChange={handleChange} required />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Email</label>
            <input className='border rounded-md p-2' name='email' value={usuario.email} type="email" onChange={handleChange} required />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>City</label>
            <input className='border rounded-md p-2' name='city' value={usuario.city} type="text" onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Address</label>
            <input className='border rounded-md p-2' name='address' value={usuario.address} type="text" onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Birthdate</label>
            <input className='border rounded-md p-2' name='birthdate' value={usuario.birthdate} type="date" onChange={handleChange} />
          </div>

          <div className="w-full flex flex-col">
            <label className='font-bold text-lg'>Password</label>
            <div className='flex border rounded-md items-center bg-white'>
              <input className=' p-2 outline-none flex-1' name="password" type={`${verPassword ? "password" : "text"}`} value={usuario.password} onChange={handleChange} />
              <label className={`mx-2 hover:cursor-pointer`} onClick={handlePass1}>{verPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</label>
            </div>
          </div>

          <div className='col-span-2'>
            {mensaje === "" ? "" : (<p className='500 border px-2 rounded-md  bg-red-500 text-2xl text-white '>{mensaje} </p>)}
          </div>

          <div className='col-span-2'>
            <div className='flex flex-col sm:flex-row col-span-2 justify-between'>
              <button className="text-center text-white sm:w-72 font-serif text-xl bg-green-500 rounded-md p-2" type="submit" >Enviar</button>
            </div>
          </div>
        </div>
      </form>

      <CuentaDelete />
    </div>
  );
}

export default Ajuste;
