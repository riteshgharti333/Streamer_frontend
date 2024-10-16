import { Link, useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import "./Watch.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContentTypeFromPriceId } from "../../utils/subscriptionMapping";
import { userProfileAsync } from "../../redux/asyncThunks/authThunks";
import { Skeleton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import axios from "axios";

const Watch = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { user } = useSelector((state) => state.auth);
  const [movie, setMovie] = useState({});
  const [isLoadingMovieType, setIsLoadingMovieType] = useState(true); // Loading movie type
  const [hasSubscription, setHasSubscription] = useState(true);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // General loading state
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const isMobile = useMediaQuery("(max-width: 480px)");

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_KEY;

  // Fetch user profile
  useEffect(() => {
    if (!profile) {
      dispatch(userProfileAsync());
    }
  }, [dispatch, profile]);

  // Fetch the movie type first (movie/series) and then load the full movie data
  useEffect(() => {
    const fetchMovieType = async () => {
      try {
        setIsLoadingMovieType(true);
        const { data } = await axios.get(`${baseUrl}/movies/${path}`);
        setMovie(data.getMovie);
        setIsLoadingMovieType(false);
      } catch (error) {
        console.error("Failed to fetch movie type:", error);
        setIsLoadingMovieType(false);
      }
    };
    fetchMovieType();
  }, [path]);

  // Once we know the movie type, handle the subscription check
  useEffect(() => {
    if (isLoadingMovieType || !movie) {
      return; // Wait until the movie type is loaded
    }

    if (!user) {
      setSubscriptionMessage(
        "You don’t have any active subscription. To enjoy unlimited access to movies and series, please choose one of our subscription plans."
      );
      setHasSubscription(false);
      setIsLoading(false);
      return;
    }

    const userPriceIds = profile?.userDetails?.subscription?.map((sub) => sub.priceId);
    const hasComboSubscription = userPriceIds?.includes(import.meta.env.VITE_MOVIE_SERIES_KEY);

    // If the user has a combo subscription, allow both movies and series
    if (hasComboSubscription) {
      setHasSubscription(true);
      setIsLoading(false);
      return;
    }

    if (movie.isSeries) {
      // Handle series subscription check
      const hasSeriesSubscription = userPriceIds?.some((priceId) => {
        const contentType = getContentTypeFromPriceId(priceId);
        return contentType === "web series" && priceId === import.meta.env.VITE_SERIES_KEY;
      });

      if (!hasSeriesSubscription) {
        setSubscriptionMessage(
          "You don’t have an active series subscription. To enjoy unlimited access to series, please choose one of our subscription plans."
        );
        setHasSubscription(false);
      } else {
        setHasSubscription(true);
      }
    } else {
      // Handle movie subscription check
      const hasMovieSubscription = userPriceIds?.some((priceId) => {
        const contentType = getContentTypeFromPriceId(priceId);
        return contentType === "movies" && priceId === import.meta.env.VITE_MOVIE_KEY;
      });

      if (!hasMovieSubscription) {
        setSubscriptionMessage(
          "You don’t have an active movies subscription. To enjoy unlimited access to movies, please choose one of our subscription plans."
        );
        setHasSubscription(false);
      } else {
        setHasSubscription(true);
      }
    }

    setIsLoading(false); // All loading done
  }, [user, movie, profile, isLoadingMovieType]);

  const NoSubscription = () => (
    <div className="noSub">
      <div className="noSubInfo bg-primary">
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

  const goback = () => {
    navigate(-1);
  };

  return (
    <div className="watchContainer">
      <div className="watch">
        <div className="WatchIcon">
          <Link to="#" onClick={goback}>
            {isLoadingMovieType ? (
              <div className="backIcon"></div>
            ) : (
              <BsArrowLeft className="backIcon" />
            )}
          </Link>
        </div>

        {isLoadingMovieType ? (
          <div className="video">
            <Skeleton variant="rectangular" width={700} height={300} />
          </div>
        ) : (
          <div className="video">
            {movie.video && (
              <YouTube
                videoId={movie.video.split("v=")[1]}
                opts={{
                  width: isMobile ? "100%" : "700",
                  height: isMobile ? "200" : "300",
                }}
                className="youtubeW"
              />
            )}
          </div>
        )}

        {isLoadingMovieType ? (
          <div className="watchInfo">
            <Skeleton width="100%" height={50} />
            <Skeleton width="50%" height={50} />
            <Skeleton width="30%" height={50} />
            <Skeleton width="100%" height={50} />
          </div>
        ) : (
          <div className="watchInfo">
            <h1>{movie.title}</h1>
            <p>{movie.desc}</p>
            <span>{movie.year}</span>
            <span className="line">|</span>
            <span>{movie.age}+</span>
            <span className="line">|</span>
            <span>{movie.genre}</span>
          </div>
        )}
      </div>

      {/* Only show the NoSubscription component if loading is done and user has no subscription */}
      {!isLoading && !hasSubscription && <NoSubscription />}
    </div>
  );
};

export default Watch;
