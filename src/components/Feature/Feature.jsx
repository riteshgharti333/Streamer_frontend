import "./Feature.scss";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRandomAsyncMovies } from "../../redux/asyncThunks/movieThunks";
import { useMediaQuery } from "@mui/material";
import MobileFeatureSlide from "../MobileFeatureSlide/MobileFeatureSlide";

const Feature = ({ type }) => {
  const [content, setContent] = useState({});
  const [featureCards, setFeatureCards] = useState([]);

  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);

  const series = useSelector((state) => state.movies.series);

  // MUI useMediaQuery hook for small and medium devices
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

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

    if (type === "movies" && movies?.movie) {
      contentData = movies.movie;
    } else if (type === "series" && series?.movie) {
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
        {isSmallScreen ? (
          featureCards.length > 0 ? (
            <MobileFeatureSlide slidesToShow={1} arrowsScroll={1}>
              {featureCards.map((featureCard) => (
                <div key={featureCard._id}>
                  <img
                    className="featureBgImg"
                    src={featureCard.featureImg}
                    alt={featureCard.title}
                  />
                  <div className="inner-shadow"></div>
                  <div className="info">
                    <h1>{featureCard.title}</h1>
                    <p>{featureCard.desc}</p>
                    <div className="smInfo">
                      <span>{featureCard.year}</span>
                      <span className="line">|</span>
                      <span>{featureCard.age}+</span>
                      <span className="line">|</span>
                      <span>{featureCard.genre}</span>
                      <span className="rating">
                        {/* <Rating className='ratings' value={feature.rating} /> */}
                      </span>
                    </div>
                    <Link to={`/movies/${featureCard._id}`}>
                      <button className="play-btn">PLAY</button>
                    </Link>
                  </div>
                </div>
              ))}
            </MobileFeatureSlide>
          ) : (
            <p>No feature cards available.</p> // Display a message if no feature cards are available
          )
        ) : (
          <>
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
                <button className="play-btn">PLAY</button>
              </Link>
            </div>
            <div className="featureAllCards">
              {featureCards.map((featureCard) => (
                <FeatureCard key={featureCard._id} featureCard={featureCard} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feature;
