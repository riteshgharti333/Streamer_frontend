import { Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import "./Watch.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncSigleMovie } from "../../redux/asyncThunks/movieThunks";
import { useCheckSubscription } from "../../utils/checkSubscription";
import { getContentTypeFromPriceId } from "../../utils/subscriptionMapping";

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

  useEffect(() => {
    dispatch(getAsyncSigleMovie(path));
  }, [path, dispatch]);

  useEffect(() => {
  if(singleMovie){
    console.log(singleMovie.getMovie);
  }
  },[singleMovie]);

  // Set movie details and check subscription status
  // useEffect(() => {
  //   if (singleMovie) {    
  //     const movieType = singleMovie.getMovie.isSeries;
  //     const userPriceIds = user.subscriptions.map((sub) => sub.priceId);

  //     const hasMovieSubscription = userPriceIds.some((priceId) => {
  //       const contentType = getContentTypeFromPriceId(priceId);
  //       return !movieType && contentType === "movies";
  //     });

  //     const hasSeriesSubscription = userPriceIds.some((priceId) => {
  //       const contentType = getContentTypeFromPriceId(priceId);
  //       return movieType && contentType === "web series";
  //     });

  //     console.log({movieType , hasMovieSubscription});

  //     if (movieType && !hasSeriesSubscription) {
  //       setSubscriptionMessage("You don’t have an active series subscription. To enjoy unlimited access to series, please choose one of our subscription plans.");
  //       setHasSubscription(false);
  //     } else if (!movieType && !hasMovieSubscription) {
  //       setSubscriptionMessage("You don’t have an active movies subscription. To enjoy unlimited access to movies, please choose one of our subscription plans.");
  //       setHasSubscription(false);
  //     } else if (!hasMovieSubscription && !hasSeriesSubscription) {
  //       setSubscriptionMessage("You don’t have an active subscription. To enjoy unlimited access to movies and series, please choose one of our subscription plans.");
  //       setHasSubscription(false);
  //     }
  //   }
  // }, [singleMovie, user]);

  const NoSubscription = () => {
    return (
      <div className="noSub">
        <div className="noSubInfo">
          <h2>No Active Subscription</h2>
          {/* <p>{subscriptionMessage}</p> */}
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
          {movie.video && (
            <YouTube videoId={movie.video.split("v=")[1]} />
          )}
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
