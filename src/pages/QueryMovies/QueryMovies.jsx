import "./QueryMovies.scss";
import QueryMovieCard from "../../components/QueryMovieCard/QueryMovieCard";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getQueryAsyncMovies,
} from "../../redux/asyncThunks/movieThunks";

const QueryMovies = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
 
  const goBack = () => {
    navigate(-1);
  }

  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const genre = queryParams.get("genre");

  const [queryMovies, setQueryMovies] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getQueryMovies = async () => {
      try {
        const response = await dispatch(
          getQueryAsyncMovies(`${type}&genre=${genre}`)
        ).unwrap();
        setQueryMovies(response.data.movies);
      } catch (error) {
        setError(error.message || "An error occurred while fetching movies.");
      }
    };
    getQueryMovies();
  }, []);

  return (
    <div
      className={`queryMoviesContainer ${
        queryMovies.length ? "" : "hasMovies"
      }`}
    >
      {/* // <div className={`queryMoviesContainer ${queryMovies.length  ?  'hasMovies' : ''}`}> */}
      <Link to="#" onClick={goBack}>
        <div className="prevIcon">
          <BsArrowLeft className="backIcon" />
          <h1>
            {genre} {type}
          </h1>
        </div>
      </Link>

      <div className="queryMovies">
        <div className="queryAllMovies">
          {queryMovies.length > 0 ? (
            queryMovies.map((query) => (
              <QueryMovieCard key={query._id} query={query} />
            ))
          ) : (
            <h3>{error}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryMovies;
