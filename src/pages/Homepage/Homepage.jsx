import "./Homepage.scss";
import Feature from "../../components/Feature/Feature";
import MovieLists from "../../components/MovieLists/MovieLists";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRandomAsyncMovies } from "../../redux/asyncThunks/movieThunks";
import { getAsyncLists, getAsyncQueryLists } from "../../redux/asyncThunks/listThunks";

const Homepage = ({ type }) => {
  const location = useLocation();
  const path = location.pathname;
  const [allists, setAllLists] = useState([]);

  const [movieLists, setMoviesLists] = useState([]);
  const [seriesLists, setSeriesLists] = useState([]);


  const dispatch = useDispatch();


  const movie = useSelector((state) => state.lists.movie);

  // const series = useSelector((state) => state.lists.series);

  // console.log("mvis  " + movie)
  // console.log("seres " + series)



  useEffect(() => {
    dispatch(getAsyncQueryLists("series"));

  }, [dispatch]); 
  
  useEffect(() => {

  }, [movie]);

  return (
    <div className="homePage">
      {/* {path === "/" || path === "/movies" ? (
        <>
          <Feature type={type} />
          {allists &&
            allists.map((list) => <MovieLists list={list} key={list._id} type={type} />)}
        </>
      ) : null}


      {path === "/series" && (
        <>
        <Feature type={type}/>
            {allists &&
            allists.map((list) => <MovieLists list={list} key={list._id} type={type} />)}
        </>
      )} */}
    </div>
  );
};

export default Homepage;
