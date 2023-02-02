import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { FcRegisteredTrademark } from 'react-icons/fc';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import axiosClient from '../utilies/axios-client';

function Navbar() {
  const { user, token, setToken, setUser } = useAuth();

  const onLogout = ev => {
    ev.preventDefault()
    axiosClient.get('/sanctum/csrf-cookie').then(response => {
      axiosClient.post('api/logout')
        .then(() => {
          setUser({})
          setToken(null)
          Navigate("/loguin");
          console.log("acabas de cerrar sesion")
        }).catch((err) => {
          console.log(err)
        })
    });
  }

  const onPerfil = ev => {
    ev.preventDefault()
    axiosClient.get('/sanctum/csrf-cookie').then(response => {
      axiosClient.post('api/perfil')
        .then(() => {
          console.log("acabas de cerrar sesion")
        }).catch((err) => {
          console.log(err)
        })
    });
  }

  return (
    <nav className="flex  justify-between items-center  bg-teal-500 p-6 shadow-sm">
      <div className='flex items-center'>
        <Link className="flex items-center flex-shrink-0 text-white mr-6 hover:cursor-pointer hover:underline" to="/">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span className="font-semibold text-xl tracking-tight">Rick and Morty</span>
        </Link>

        <Link to="/lista" className='inline-block text-xl px-4 py-2 leading-none border-b rounded text-white border-white mr-2 
         hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 hover:underline'>Personajes</Link>
      </div>

      <div className="">
        <div>
          {!user ? ((<Link to="/loguin" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mr-2 
         hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 "> <span className='flex gap-2'><AiOutlineLogin /> Login</span>
          </Link>)(
            <Link to="/registrarse" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mr-2
         hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"><span className='flex gap-2'><FcRegisteredTrademark /> Register</span>
            </Link>)) : (<button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mr-2
         hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={onLogout}><span className='flex gap-2'><FcRegisteredTrademark /> Cerrar</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
