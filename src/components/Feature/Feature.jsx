import "./Feature.scss";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRandomAsyncMovies } from "../../redux/asyncThunks/movieThunks";

const Feature = ({ type }) => {
  const [content, setContent] = useState({});
  const [featureCards, setFeatureCards] = useState([]);

  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);

  const series = useSelector((state) => state.movies.series);

  useEffect(() => {
    const getRandomContent = () => {
      try {
        dispatch(getRandomAsyncMovies(type));
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [dispatch, type]);

  useEffect(() => {

    let contentData = [];
    
    if (type === 'movies' && movies?.movie) {
      contentData = movies.movie;
    } else if (type === 'series' && series?.movie) {
      contentData = series.movie;
    }
    if (contentData.length > 0) {
      setContent(contentData[0]);
      setFeatureCards(contentData.slice(1, 6));
    }
  }, [movies, series, type]);

  return (
    <div className="feature">
      <div className="featureContainer">
        <img
          className="featureBgImg"
          src={content.featureImg}
          alt={content.title}
        />
        <div className="inner-shadow"></div>
        <div className="info">
          <h1>{content.title}</h1>
          <p>{content.desc}</p>
          <div className="smInfo">
            <span>{content.year}</span>
            <span className="line">|</span>
            <span>{content.age}+</span>
            <span className="line">|</span>
            <span>{content.genre}</span>
            <span className="rating">
              {/* <Rating className='ratings' value={feature.rating} /> */}
            </span>
          </div>
          <Link to={`/movies/${content._id}`}>
            <button>PLAY</button>
          </Link>
        </div>
        <div className="featureAllCards">
          {featureCards.map((featureCard) => (
            <FeatureCard
              title={featureCard.title}
              desc={featureCard.desc}
              year={featureCard.year}
              age={featureCard.age}
              genre={featureCard.genre}
              featureSmImg={featureCard.featureImg}
              id={featureCard._id}
              key={featureCard._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
