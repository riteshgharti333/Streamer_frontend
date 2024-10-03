import { Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import "./Watch.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncSigleMovie } from "../../redux/asyncThunks/movieThunks";
import { getContentTypeFromPriceId } from "../../utils/subscriptionMapping";
import { userProfileAsync } from "../../redux/asyncThunks/authThunks";
import { Skeleton } from "@mui/material";

const Watch = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { user } = useSelector((state) => state.auth);

  const [movie, setMovie] = useState({});
  const [hasSubscription, setHasSubscription] = useState(true);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { singleMovie } = useSelector((state) => state.movies);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!profile) {
      dispatch(userProfileAsync());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAsyncSigleMovie(path));
    setIsLoading(false);
  }, [path, dispatch]);

  useEffect(() => {
    if (singleMovie && singleMovie.getMovie) {
      setMovie(singleMovie.getMovie);
    }
  }, [singleMovie]);

  useEffect(() => {
    if (!user) {
      setSubscriptionMessage(
        "You don’t have any active subscription. To enjoy unlimited access to movies and series, please choose one of our subscription plans.",
      );
      setHasSubscription(false);
      return; // Exit early since there's no user.
    }

    if (singleMovie) {
      const seriesType = singleMovie.getMovie.isSeries;
      const userPriceIds =
        profile && profile.userDetails.subscription.map((sub) => sub.priceId);

      const hasComboSubscription = userPriceIds?.includes(
        import.meta.env.VITE_MOVIE_SERIES_KEY,
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
        (hasSubscription) => hasSubscription === true,
      );

      const SeriesSubscription = userPriceIds?.map((priceId) => {
        if (priceId === import.meta.env.VITE_SERIES_KEY) {
          const contentType = getContentTypeFromPriceId(priceId);
          return seriesType && contentType === "web series";
        }
      });

      const hasSeriesSubscription = SeriesSubscription?.some(
        (hasSubscription) => hasSubscription === true,
      );

      if (seriesType && !hasSeriesSubscription) {
        setSubscriptionMessage(
          "You don’t have an active series subscription. To enjoy unlimited access to series, please choose one of our subscription plans.",
        );
        setHasSubscription(false);
      } else if (!seriesType && !hasMovieSubscription) {
        setSubscriptionMessage(
          "You don’t have an active movies subscription. To enjoy unlimited access to movies, please choose one of our subscription plans.",
        );
        setHasSubscription(false);
      } else if (!hasMovieSubscription && !hasSeriesSubscription) {
        setSubscriptionMessage(
          "You don’t have any active subscription. To enjoy unlimited access to movies and series, please choose one of our subscription plans.",
        );
        setHasSubscription(false);
      } else if (!user) {
        setSubscriptionMessage(
          "You don’t have any active subscription. To enjoy unlimited access to movies and series, please choose one of our subscription plans.",
        );
        setHasSubscription(false);
      }
    }
  }, [user, singleMovie, profile]);

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
            {isLoading ? (
              <div className="backIcon"></div>
            ) : (
              <BsArrowLeft className="backIcon" />
            )}
          </Link>
        </div>
        {isLoading ? (
          <div className="video">
            <Skeleton variant="rectangular" width={700} height={300} />
          </div>
        ) : (
          <>
            <div className="video">
              {/* <video src={movie.video} controls autoPlay muted></video> */}
              {movie.video && (
                <YouTube
                  videoId={movie.video.split("v=")[1]}
                  className="youtubeW"
                />
              )}
            </div>
          </>
        )}
        {isLoading ? (
          <div className="watchInfo">
            <Skeleton width="100%" height={50} />
            <Skeleton width="50%" height={50} />
            <Skeleton width="30%" height={50} />
            <Skeleton width="100%" height={50} />
          </div>
        ) : (
          <>
            <div className="watchInfo">
              <h1>{movie.title}</h1>
              <p>{movie.desc}</p>
              <span>{movie.year}</span>
              <span className="line">|</span>
              <span>{movie.age}+</span>
              <span className="line">|</span>
              <span>{movie.genre}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Watch;
