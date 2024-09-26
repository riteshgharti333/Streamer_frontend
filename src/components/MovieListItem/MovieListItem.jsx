import { useEffect, useState } from "react";
import "./MovieListItem.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAsyncSigleMovie } from "../../redux/asyncThunks/movieThunks";
import { Skeleton, useMediaQuery } from "@mui/material";

const MovieListItem = ({ item }) => {
  const [movie, setMovie] = useState({});
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery("(max-width: 480px)");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchMovie = async () => {
      const response = await dispatch(getAsyncSigleMovie(item)).unwrap();
      setMovie(response.getMovie);
    };
    fetchMovie();
    setIsLoading(true);
  }, [dispatch, item]);

  return (
    <>
      {isSmallScreen ? (
        <Link to={`/movies/${movie?._id}`}>
          {isLoading ? (
            <div className="smMovieListItem">
              <Skeleton variant="rectangular" height={100} />

              <div className="smMovieListItemInfo">
                <Skeleton width="60%" height={20} />
                <Skeleton width="50%" height={20} />
                <Skeleton width="30%" height={20} />
              </div>
            </div>
          ) : (
            <div className="smMovieListItem">
              <img className="smMovieListItemImg" src={movie?.smImg} alt="" />
              <div className="smMovieListItemInfo">
                <p className="smName">{movie?.title}</p>
                <span className="item">
                  <p className="smYear">{movie?.year}</p>

                  <span className="line"> | </span>

                  <p className="smAge">{movie.age}+</p>
                </span>
              </div>
            </div>
          )}
        </Link>
      ) : (
        <>
          <div className="movieListItem">
            <img className="movieListItemImg" src={movie?.smImg} alt="" />
            <div className="movieListItemInfo">
              <p className="name">{movie?.title}</p>
              <p className="year">{movie?.year}</p>
              <button className="play-btn">
                <Link to={`/movies/${movie?._id}`}>Play</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieListItem;
