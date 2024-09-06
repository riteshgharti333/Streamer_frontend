import { Link } from 'react-router-dom';
import './QueryMovieCard.scss'

const QueryMovieCard = (query) => {
  
  const {_id , smImg,title,year,age,genre} = query.query;

  return (
    <Link to={`/movies/${_id}`}>
    <div className='queryMovieCard'>
         <div className="queryMovie">
        <img src={smImg} alt="" />
        <p className='title'>{title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tempore tempora iure quas eum in, exercitationem minus qui necessitatibus esse eaque? Ab molestiae, vitae voluptatibus quod reiciendis, cupiditate maxime totam explicabo doloribus optio mollitia reprehenderit alias, dolores maiores aut voluptate.</p> 
        <div className="queryMoviesInfo">
        <span>{year}</span>
          <span className='line'>|</span>
          <span>{age} +</span>
          <span className='line'>|</span>
          <span>{genre}</span>
        </div>
      </div>
    </div>
    </Link>

  )
}

export default QueryMovieCard
