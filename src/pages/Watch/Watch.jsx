import { Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import "./Watch.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAsyncSigleMovie } from "../../redux/asyncThunks/movieThunks";
import { useCheckSubscription } from "../../utils/checkSubscription";

const Watch = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [movie, setMovie] = useState({});

  const checkSubscription = useCheckSubscription();
  const [hasSubscription, setHasSubscription] = useState(true);

  useEffect(() => {
    const result = checkSubscription();
    setHasSubscription(result);
  }, [checkSubscription]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getMovie = async () => {
      const res = await dispatch(getAsyncSigleMovie(path)).unwrap();
      setMovie(res.getMovie);
    };
    getMovie();
  }, [path]);

  const sm = window.innerWidth;

  const opts = {
    height: sm <= 480 ? "100%" : "390",
    width: sm <= 480 ? "100%" : "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const NoSubscription = () => {
    return (
      <div className="noSub">
        <div className="noSubInfo">
          <h2>No Active Subscription</h2>
          <p>
            You don’t have an active subscription. To enjoy unlimited access to
            movies and series, please choose one of our subscription plans.
          </p>
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
     <NoSubscription />

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
          <YouTube videoId={movie.video.split("v=")[1]} opts={opts} />
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
