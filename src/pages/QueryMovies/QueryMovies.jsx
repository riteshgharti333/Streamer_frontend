import { IoMdArrowRoundBack } from "react-icons/io";
import './QueryMovies.scss'
import QueryMovieCard from "../../components/QueryMovieCard/QueryMovieCard";

const QueryMovies = () => {
  return (
    <>
    <div className='queryMovies'>
      <div className="queryMoviesTop">
      <IoMdArrowRoundBack className="backIcon" />
       <p>Animation</p>
      </div>
      <div className="queryAllMovies">

      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
      <QueryMovieCard />
    </div>
    </div>

    </>
  )
}

export default QueryMovies
