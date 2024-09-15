import { Link } from 'react-router-dom';
import './QueryMovieCard.scss'

const QueryMovieCard = (query) => {
  
  const {_id , smImg,title,year,age,genre} = query.query;

  return (
    <div className='queryMovieCard'>
    <Link to={`/movies/${_id}`}>

         <div className="queryMovie">
        <img src={smImg} alt="" />
        <p className='title'>{title}</p> 
        <div className="queryMoviesInfo">
        <span>{year}</span>
          <span className='line'>|</span>
          <span>{age} +</span>
          <span className='line'>|</span>
          <span>{genre}</span>
        </div>
      </div>
    </Link>

    </div>

  )
}

export default QueryMovieCard
