import "./QueryMovies.scss";
import QueryMovieCard from "../../components/QueryMovieCard/QueryMovieCard";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getQueryAsyncMovies } from "../../redux/asyncThunks/movieThunks";
import { Skeleton } from "@mui/material";

const QueryMovies = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const genre = queryParams.get("genre");

  const [queryMovies, setQueryMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getQueryMovies = async () => {
      setError(null); // Clear any previous errors
      setQueryMovies([]); // Clear previous data
      setIsLoading(true);

      try {
        const response = await dispatch(
          getQueryAsyncMovies(`${type}&genre=${genre}`),
        ).unwrap();
        setQueryMovies(response.data.movies);
      } catch (error) {
        setError(error.message || "An error occurred while fetching movies.");
      } finally {
        setIsLoading(false);
      }
    };
    getQueryMovies();
  }, [dispatch, type, genre]);

  return (
    <div
      className={`queryMoviesContainer ${
        queryMovies.length > 0 ? "" : "hasMovies"
      }`}
    >
      <Link to="#" onClick={goBack}>
        <div className="prevIcon">
          {isLoading ? (
            <>
              <Skeleton width={200} height={50} />
            </>
          ) : (
            <>
              <BsArrowLeft className="backIcon" />
              <h1>
                {genre} {type}
              </h1>
            </>
          )}
        </div>
      </Link>

      <div className="queryMovies">
        <div
          className={` ${
            queryMovies.length > 0 ? "queryAllMovies" : "hasError"
          }`}
        >
          {queryMovies.length > 0 ? (
            queryMovies.map((query) => (
              <QueryMovieCard
                key={query._id}
                query={query}
                isLoading={isLoading}
              />
            ))
          ) : (
            <h3 className="hasError">{error}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryMovies;
