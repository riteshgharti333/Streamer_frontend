import "./Homepage.scss";
import Feature from "../../components/Feature/Feature";
import MovieLists from "../../components/MovieLists/MovieLists";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsyncQueryLists,
} from "../../redux/asyncThunks/listThunks";

const Homepage = ({ type }) => {
  const location = useLocation();
  const path = location.pathname;

  const [movieLists, setMoviesLists] = useState([]);
  const [seriesLists, setSeriesLists] = useState([]);

  const dispatch = useDispatch();

  const { movie, series } = useSelector((state) => state.lists.lists);

  
  useEffect(() => {
    dispatch(getAsyncQueryLists(type));
  }, [dispatch]);

  useEffect(() => {
    
   type === 'movies' ?  setMoviesLists(movie.lists) : setSeriesLists(series.lists)
  
  }, [movie,series]);

  return (
    <div className="homePage">
      {path === "/" || path === "/movies" ? (
        <>
          <Feature type={type} />
          {movieLists &&
            movieLists.map((list) => (
              <MovieLists list={list} key={list._id} type={type} />
            ))}
        </>
      ) : null}

      {path === "/series" && (
        <>
          <Feature type={type} />
          {seriesLists &&
            seriesLists.map((list) => (
              <MovieLists list={list} key={list._id} type={type} />
            ))}
        </>
      )}
    </div>
  );
};

export default Homepage;
