import { useEffect, useState } from 'react'
import './MovieListItem.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieListItem = ({item,index}) => {


  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("https://streamer-backend.onrender.com/api/movies/" + item)
        setMovie(res.data.getMovie);
      } catch (error) {
        console.log(error)
      }
    }
    getMovie();
  })


  return (
    <div className='movieListItem'>
      <img className='movieListItemImg' src={movie?.featureImg} alt="" />
      <div className="movieListItemInfo">
      <span className='name'>{movie?.title}</span>
      <span className='year'>{movie?.year}</span>
     <button>
     <Link to={`/movies/${movie?._id}`}>
  Play
</Link>
      </button>
      </div>
    </div>
  )
}

export default MovieListItem
