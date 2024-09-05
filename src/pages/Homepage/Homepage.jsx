import "./Homepage.scss";
import Feature from "../../components/Feature/Feature";
import MovieLists from "../../components/MovieLists/MovieLists";
import { Link, useLocation } from "react-router-dom";
import useLists from './useLists'; // Import your custom hook
import Navbar from "../../components/Navbar/Navbar";

const Homepage = ({ type }) => {
  const location = useLocation();
  const path = location.pathname;
  const { movieLists, seriesLists } = useLists();

  const renderLists = (lists, type) =>
    lists.map((list) => (
      <MovieLists list={list} key={list._id} type={type} />
    ));

  return (
    <div className="homePage">
      {path === "/" && (
        <>
          <Feature type="movies" />
          {renderLists(movieLists, 'movies')}
          <Link to={"/series"}>
          <h1 className="title">Series</h1>

          </Link>
          <Feature type="series" />
          {renderLists(seriesLists, 'series')}
        </>
      )}

      {path === "/movies" && (
        <>
          <Feature type="movies" />
          {renderLists(movieLists, 'movies')}
        </>
      )}

      {path === "/series" && (
        <>
          <Feature type="series" />
          {renderLists(seriesLists, 'series')}
        </>
      )}
    </div>
  );
};

export default Homepage;
