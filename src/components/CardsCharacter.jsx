import React, {  useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import axiosClient from '../utilies/axios-client';
import { useAuth } from '../context/ContextProvider';
import swal from 'sweetalert';
import { AiFillDelete } from 'react-icons/ai';

const CardsCharacter = ({ dato, estado, setEstado }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth();
  const { categoria } = useParams();

  const handleSave = () => {
    const data = {
      ref_api: dato.id,
      user_id: user.id,
    }

    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        return axiosClient.post('api/favorito', data)
      })
      .then(({ data }) => {
        const mensaje = data.mensaje
        swal(mensaje, "", "success");
      })
      .catch(error => {
        const status = error.response.status
        if (status === 409) {
          const mensaje = error.response.data.mensaje
          swal(mensaje, "Agregue otro nuevo", "info");
        }
      });
  }

  const handleDelete = () => {
    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        return axiosClient.delete(`api/favorito/${user.id}/${dato.id}`)
      })
      .then(({ data }) => {
        swal("Exitoso", "Se elimino " + dato.name + " de su lista de favoritos", "success");
        setEstado(!estado)
      })
      .catch(error => {
        const response = error.response;
        swal("Fallida", "No se pudo eliminar " + dato.name + " de su lista de favoritos", "warning");
      });
  }

  return (
    <div
      className={`flex flex-col shadow-md m-2 rounded-md bg-white hover:bg-slate-300 cursor-default relative`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className='mt-5 flex flex-col items-center'>
        <div className='items-end bg-blue-400 flex w-full mt-3 mb-3'>
          {categoria != "favoritos" ?
            <div className=""> <MdOutlineFavoriteBorder className='absolute mx-4 hover:text-green-600 text-3xl cursor-pointer' onClick={handleSave} /></div> :
            <div className='hover:text-red-600 '> <AiFillDelete className='absolute mx-4 text-3xl cursor-pointer ' onClick={handleDelete} /></div>
          }
        </div>
        <img src={dato.image} alt={dato.name} className="flex w-56 h-56 rounded-full  hover:translate-x-1 hover:duration-500 hover:transition" />

        <div className='flex flex-col items-center justify-center gap-2'>
          <p className='font-bold text-xl text-center'>{`${dato.name}`.substring(0, 10)}</p>
        </div>
        <div className='px-2 font-semibold mt-2 bg-slate-100 flex gap-3 items-center justify-center'>
          <p className='px-2'>Genero <span className='font-normal'> {dato.gender}</span></p>
        </div>
      </div>
      {showDetails && (
        <Link
          className={`absolute bg-red-500 w-full left-0 bottom-0 text-center capitalize text-white font-bold cursor-pointer h-7 transition translate-y-0 duration-500`}
          to={`/detalles/${dato.id}`}
        >
          <p>detalles</p>
        </Link>
      )}
    </div>
  );
};

export default CardsCharacter
