import { useEffect, useState } from 'react';
import CardsCharacter from '../components/CardsCharacter';
import CardsLocation from '../components/CardsLocation';
import SkeletonsCardCharacter from '../components/skeletons/SkeletonsCardCharacter';
import { URL } from '../utilies/Utilidades';

function Lista() {
  const [filter, setFilter] = useState('character');
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [hasMores, setHasMore] = useState(false)

  useEffect(() => {
    fetchData();
    console.log(currentPage)
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [filter, currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}${filter}/?page=${currentPage}`)
      const { results, info } = await response.json();
      setData(data.concat(results))
      setTotalPages(info.pages);
    } catch (error) {
      console.log(error)
    }
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const renderCards = () => {
    return data.map((item, index) => {
      const Card = filter === 'character' ? CardsCharacter : CardsLocation;
      return (
        <div key={index}>
          <Card dato={item} />
        </div>
      )
    })
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col sm:flex-row shadow p-2 ml-3 mt-5 gap-4 sm:justify-center sm:items-center'>
        <p className='font-bold text-2xl'>Filtro</p>
        <ul className='flex flex-col sm:flex-row mx-2 gap-5'>
          <li className={`border p-2 cursor-pointer hover:bg-green-300 rounded-md ${filter === "character" ? "bg-slate-300" : ""}`} onClick={() => (setFilter("character"), setCurrentPage(1), setData([]))}>characters</li>
          <li className={`border p-2 cursor-pointer hover:bg-green-300 rounded-md ${filter === "location" ? "bg-slate-300" : ""}`} onClick={() => (setFilter("location"), setCurrentPage(1), setData([]))}>locations</li>
          <li className={`border p-2 cursor-pointer hover:bg-green-300 rounded-md ${filter === "episode" ? "bg-slate-300" : ""}`} onClick={() => (setFilter("episode"), setCurrentPage(1), setData([]))}>episodes</li>
        </ul>
      </div>
      <div className={`${filter === "character" ? "grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5" : filter === "location" ? "md:grid grid-cols-2" : ""} `} onScroll={handleScroll}>
        {!data ? (<SkeletonsCardCharacter />) : (renderCards())
        }
      </div>
      {hasMores ? (<p className=' text-center my-10 text-2xl'>cargando datos ...</p>) : ""}
    </div>
  );



}

export default Lista;
