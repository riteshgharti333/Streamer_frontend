import { Link } from "react-router-dom";
import "./QueryMovieCard.scss";
import { Skeleton } from "@mui/material";

const QueryMovieCard = ({ query, isLoading }) => {
  const { _id, smImg, title, year, age, genre } = query;


  return (
    <div className="queryMovieCard">
      <Link to={`/movies/${_id}`}>
        {isLoading ? (
          <div className="queryMovie">
            {/* Skeleton for Image */}
            <Skeleton variant="rectangular" height={100} />

            {/* Skeleton for Title */}
            <Skeleton width="60%" height={30} style={{ marginTop: '10px' }} />

            {/* Skeleton for Movie Info (year, age, genre) */}
            <div className="queryMoviesInfo">
              <Skeleton width="20%" height={20} />
              <Skeleton width="10%" height={20} style={{ margin: '0 5px' }} />
              <Skeleton width="20%" height={20} />
            </div>
          </div>
        ) : (
          <div className="queryMovie">
            <img src={smImg} alt={title} />
            <p className="title">{title}</p>
            <div className="queryMoviesInfo">
              <span>{year}</span>
              <span className="line">|</span>
              <span>{age} +</span>
              <span className="line">|</span>
              <span>{genre}</span>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default QueryMovieCard;
