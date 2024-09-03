import { useEffect, useState } from "react";
import "./MovieListItem.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAsyncSigleMovie } from "../../redux/asyncThunks/movieThunks";

const MovieListItem = ({ item }) => {
  const [movie, setMovie] = useState({});
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchMovie = async () => {
      const response = await dispatch(getAsyncSigleMovie(item)).unwrap();
        setMovie(response.getMovie);
    };
    fetchMovie();
  }, [dispatch, item]);

  return (
    <div className="movieListItem">
      <img className="movieListItemImg" src={movie?.smImg} alt="" />
      <div className="movieListItemInfo">
        <p className="name">{movie?.title}</p>
        <p className="year">{movie?.year}</p>
        <button>
          <Link to={`/movies/${movie?._id}`}>Play</Link>
        </button>
      </div>
    </div>
  );
};

export default MovieListItem;
