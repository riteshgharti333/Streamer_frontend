import "./MovieLists.scss";
import MovieListItem from "../MovieListItem/MovieListItem";
import Slide from "../Slide/Slide";
import { Link } from "react-router-dom";

const MovieLists = ({ list, type }) => {
  //  const sm = window.innerWidth;
  //  let slide;

  //  if(sm <= 480){
  //    slide = 1;
  //  }else if(sm <= 768){
  //   slide = 2;
  //  }else if(sm <= 1024){
  //   slide = 3;
  //  }else{
  //   slide = 4;
  //  }

  return (
    <div className="movieLists">
      <div className="movieListsTop">
        <h1>{list.title}</h1>

        <p>
          <Link  to={`/query?type=${type}&genre=${list.genre}`}>View All</Link>
        </p>
      </div>
      <div className="movieListsItems">
        <Slide slidesToShow={4} arrowsScroll={1}>
          {list.content.map((item, index) => (
            <MovieListItem key={item.id || index} item={item} type={type} />
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default MovieLists;
