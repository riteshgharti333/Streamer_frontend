import "./Homepage.scss";
import Feature from "../../components/Feature/Feature";
import MovieLists from "../../components/MovieLists/MovieLists";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";

const Homepage = ({ type, anType }) => {
  const location = useLocation();
  const path = location.pathname;
  const [lists, setLists] = useState([]);

  const baseURL = `https://streamer-backend.onrender.com/api/list/`;

  const typeParam = type ? `?type=${type}` : "";

  const url = `${baseURL}${typeParam}`;

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(url);
        setLists(res.data.movies);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type]);

  return (
    <div className="homePage">
      <Navbar />

      {path === "/" || path === "/movies" ? (
        <>
          <Feature type={type} />
          {lists.map((list) => (
            <MovieLists list={list} key={list._id} />
          ))}
        </>
      ) : null}

      {/* {path === "/" && (
        <>
          <Feature type={type}/>
          {
            lists.map((list) => (
              <MovieLists  list={list} key={list._id} />
            ))
          }


          <Feature anType={anType}/>
          <MovieLists />
          <MovieLists />
        </>
      )} */}

      {path === "/series" && (
        <>
          <Feature type={type} />
          {lists.map((list) => (
            <MovieLists list={list} />
          ))}
        </>
      )}
    </div>
  );
};

export default Homepage;
