import "./Homepage.scss";
import Feature from "../../components/Feature/Feature";
import MovieLists from "../../components/MovieLists/MovieLists";
import { Link, useLocation } from "react-router-dom";
import useLists from "./useLists";
import { Skeleton } from "@mui/material";

const Homepage = () => {
  const location = useLocation();
  const path = location.pathname;
  const { movieLists, seriesLists, homempageSL, homempageML, isLoading } =
    useLists();

  const renderLists = (lists, type) =>
    lists.map((list) => (
      <MovieLists
        list={list}
        key={list._id}
        type={type}
        isLoading={isLoading}
      />
    ));

  return (
    <div className="homePage">
      {path === "/" && (
        <>
          <Feature type="movies" />
          {renderLists(homempageML, "movies")}
          <Link to={"/series"}>
            {isLoading ? (
              <Skeleton width={100} height={50} style={{ margin: "0 auto" }} />
            ) : (
              <h1 className="title">Series</h1>
            )}
          </Link>
          <Feature type="series" />
          {renderLists(homempageSL, "series")}
        </>
      )}

      {path === "/movies" && (
        <>
          <Feature type="movies" />
          {renderLists(movieLists, "movies")}
        </>
      )}

      {path === "/series" && (
        <>
          <Feature type="series" />
          {renderLists(seriesLists, "series")}
        </>
      )}
    </div>
  );
};

export default Homepage;
