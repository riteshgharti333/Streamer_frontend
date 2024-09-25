import "./Feature.scss";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRandomAsyncMovies } from "../../redux/asyncThunks/movieThunks";
import { Skeleton, useMediaQuery } from "@mui/material";
import MobileFeatureSlide from "../MobileFeatureSlide/MobileFeatureSlide";

const Feature = ({ type }) => {
  const [content, setContent] = useState({});
  const [featureCards, setFeatureCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const series = useSelector((state) => state.movies.series);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  // Fetch random content based on the type (movies or series)
  useEffect(() => {
    const getRandomContent = async () => {
      setIsLoading(true);
      try {
        await dispatch(getRandomAsyncMovies(type)).unwrap();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // Stop loading after fetch completes
      }
    };
    getRandomContent();
  }, [dispatch, type]);

  // Set content and feature cards based on the fetched data
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
          isLoading ? (
            // Loading skeleton for small screens
            <MobileFeatureSlide slidesToShow={1} arrowsScroll={1}>
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={300}
                  style={{ borderRadius: 10, marginBottom: "10px" }}
                />
              ))}
            </MobileFeatureSlide>
          ) : featureCards.length > 0 ? (
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
                    </div>
                    <Link to={`/movies/${featureCard._id}`}>
                      <button className="play-btn">PLAY</button>
                    </Link>
                  </div>
                </div>
              ))}
            </MobileFeatureSlide>
          ) : (
            <p>No feature cards available.</p>
          )
        ) : (
          <div>
            {isLoading ? (
              // Loading skeleton for large screens
              <div className="featureLoading">
                <Skeleton variant="rectangular" width="100%" height={300} />
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="80%" height={30} />
              </div>
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
                  </div>
                  <Link to={`/movies/${content._id}`}>
                    <button className="play-btn">PLAY</button>
                  </Link>
                </div>
              </>
            )}

            {isLoading ? (
              <div className="featureAllCards" style={{position: "absolute" , top: "60px"}}>
              <Skeleton  width={150} height={500}/>
              <Skeleton  width={150} height={500}/>
              <Skeleton  width={150} height={500}/>
              <Skeleton  width={150} height={500}/>
              <Skeleton  width={150} height={500}/>


              </div>
            ) : (
              <>
                <div className="featureAllCards">
                  {featureCards.map((featureCard) => (
                    <FeatureCard
                      key={featureCard._id}
                      featureCard={featureCard}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feature;
