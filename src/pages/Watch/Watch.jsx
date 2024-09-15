import { Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import "./Watch.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncSigleMovie } from "../../redux/asyncThunks/movieThunks";
import { useCheckSubscription } from "../../utils/checkSubscription";
import { getContentTypeFromPriceId } from "../../utils/subscriptionMapping";
import { userProfileAsync } from "../../redux/asyncThunks/authThunks";

const Watch = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [movie, setMovie] = useState({});
  const [hasSubscription, setHasSubscription] = useState(true);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const checkSubscription = useCheckSubscription();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.user);
  const { singleMovie } = useSelector((state) => state.movies);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!profile) {
      dispatch(userProfileAsync());
    }
  }, [dispatch, profile]);


  useEffect(() => {
    dispatch(getAsyncSigleMovie(path));
  }, [path, dispatch]);

  useEffect(() => {
    if (singleMovie && singleMovie.getMovie) {
      setMovie(singleMovie.getMovie);
    }
  }, [singleMovie]);

  useEffect(() => {
    if (singleMovie) {
      const seriesType = singleMovie.getMovie.isSeries;
      const userPriceIds =
        profile && profile.userDetails.subscription.map((sub) => sub.priceId);

      const hasComboSubscription = userPriceIds?.includes(
        import.meta.env.VITE_MOVIE_SERIES_KEY
      );

      if (hasComboSubscription) {
        setHasSubscription(true);
        return;
      }

      const MovieSubscription = userPriceIds?.map((priceId) => {
        if (priceId === import.meta.env.VITE_MOVIE_KEY) {
          const contentType = getContentTypeFromPriceId(priceId);
          return !seriesType && contentType === "movies";
        }
      });

      const hasMovieSubscription = MovieSubscription?.some(
        (hasSubscription) => hasSubscription === true
      );

      const SeriesSubscription = userPriceIds?.map((priceId) => {
        if (priceId === import.meta.env.VITE_SERIES_KEY) {
          const contentType = getContentTypeFromPriceId(priceId);
          return seriesType && contentType === "web series";
        }
      });

      const hasSeriesSubscription = SeriesSubscription?.some(
        (hasSubscription) => hasSubscription === true
      );

      if (seriesType && !hasSeriesSubscription) {
        setSubscriptionMessage(
          "You don’t have an active series subscription. To enjoy unlimited access to series, please choose one of our subscription plans."
        );
        setHasSubscription(false);
      } else if (!seriesType && !hasMovieSubscription) {
        setSubscriptionMessage(
          "You don’t have an active movies subscription. To enjoy unlimited access to movies, please choose one of our subscription plans."
        );
        setHasSubscription(false);
      } else if (!hasMovieSubscription && !hasSeriesSubscription) {
        setSubscriptionMessage(
          "You don’t have an active subscription. To enjoy unlimited access to movies and series, please choose one of our subscription plans."
        );
        setHasSubscription(false);
      }
    }
  }, [singleMovie, profile]);

  const NoSubscription = () => {
    return (
      <div className="noSub">
        <div className="noSubInfo">
          <h2>No Active Subscription</h2>
          <p>{subscriptionMessage}</p>
          <div className="noSubActions">
            <button
              className="btn-primary"
              onClick={() => (window.location.href = "/subscriptions")}
            >
              View Subscription Plans
            </button>
            <button
              className="btn-secondary"
              onClick={() => (window.location.href = "/")}
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="watchContainer">
      {!hasSubscription && <NoSubscription />}

      <div className="watch">
        <div className="WatchIcon">
          <Link to="/">
            <BsArrowLeft className="backIcon" />
          </Link>
        </div>
        <div className="video">
          {/* Commented out the video element */}
          {/* <video src={movie.video} controls autoPlay muted></video> */}
          {movie.video && <YouTube videoId={movie.video.split("v=")[1]} className="youtubeW" />}
        </div>
        <div className="watchInfo">
          <h1>{movie.title}</h1>
          <p>{movie.desc}</p>
          <span>{movie.year}</span>
          <span className="line">|</span>
          <span>{movie.age}+</span>
          <span className="line">|</span>
          <span>{movie.genre}</span>
        </div>
      </div>
    </div>
  );
};

export default Watch;
