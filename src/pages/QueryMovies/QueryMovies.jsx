import "./QueryMovies.scss";
import QueryMovieCard from "../../components/QueryMovieCard/QueryMovieCard";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAsyncMovies, getQueryAsyncMovies } from "../../redux/asyncThunks/movieThunks";

const QueryMovies = () => {

  const dispatch = useDispatch();
  const {search} = useLocation();
 
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const genre = queryParams.get("genre");

  console.log(search);
 
 const [quertMovies , setQueryMovies] = useState([]); 

 const [error, setError] = useState(null);
  

  useEffect(() => {
    const getQueryMovies = async () => {
      try {
        const response = await dispatch(getQueryAsyncMovies(`${type}&genre=${genre}`)).unwrap();
        setQueryMovies(response.data.movies);    
      } catch (error) {
        setError(error.message || "An error occurred while fetching movies.");
      }
    }
    getQueryMovies();
  },[]);

  return (
    <div className={`queryMoviesContainer ${quertMovies.length > 0 ? 'queryMoviesContainer' : 'hasMovies'}`}>
      <Link to="/">
        <div className="prevIcon">
          <BsArrowLeft className="backIcon" />
          <h1>{genre} {type}</h1>
        </div>
      </Link>

      <div className="queryMovies">
        <div className="queryAllMovies">
          {quertMovies.length > 0 ?  quertMovies.map((query) => (
            <QueryMovieCard  key={query._id} query={query}/>
          )) : 
          <h3>{error}</h3>
          }
        </div>
      </div>
    </div>
  );
};

export default QueryMovies;
