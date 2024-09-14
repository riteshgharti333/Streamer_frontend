import "./MovieLists.scss";
import MovieListItem from "../MovieListItem/MovieListItem";
import Slide from "../Slide/Slide";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const MovieLists = ({ list, type }) => {
  const isXxl = useMediaQuery("(min-width: 1400px)");
  // const isXl = useMediaQuery("(max-width: 1200px)");
  const isXlRange = useMediaQuery("(min-width: 1200px) and (max-width: 1400px)");

  const isLgRange = useMediaQuery("(min-width: 1025px) and (max-width: 1199px)");
  const isLg = useMediaQuery("(max-width: 1024px)");
  const isMd = useMediaQuery("(max-width: 768px)");
  const isSMd = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(max-width: 480px)");

  let slidesToShow = 1;
  if (isXxl) slidesToShow = 4;
  else if (isXlRange) slidesToShow = 4;
  else if (isLgRange) slidesToShow = 4;
  else if (isLg) slidesToShow = 4;
  else if (isMd) slidesToShow = 3;
  else if (isSMd) slidesToShow = 2;
  

  return (
    <div className="movieLists">
      <div className="movieListsTop">
        <h1>{list.title}</h1>
        <p>
          <Link to={`/query?type=${type}&genre=${list.genre}`}>View All</Link>
        </p>
      </div>
      {isSm ? (
        <div className="mobileWidth">
          {list.content.map((item, index) => (
            <MovieListItem key={item.id || index} item={item} type={type} />
          ))}
        </div>
      ) : (
        <div className="movieListsItems">
          <Slide slidesToShow={slidesToShow} arrowsScroll={1}>
            {list.content.map((item, index) => (
              <MovieListItem key={item.id || index} item={item} type={type} />
            ))}
          </Slide>
        </div>
      )}
    </div>
  );
};

export default MovieLists;
