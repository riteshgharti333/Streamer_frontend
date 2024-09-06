import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncQueryLists } from "../../redux/asyncThunks/listThunks";

const useLists = () => {
  const [movieLists, setMovieLists] = useState([]);
  const [seriesLists, setSeriesLists] = useState([]);

  const [homempageML, setHomempageML] = useState([]);
  const [homempageSL, setHomempageSL] = useState([]);

  const dispatch = useDispatch();
  const { movie, series } = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(getAsyncQueryLists("movies"));
    dispatch(getAsyncQueryLists("series"));
  }, [dispatch]);

  useEffect(() => {
    setMovieLists(movie?.lists || []);
    setSeriesLists(series?.lists || []);
    setHomempageSL(series?.lists?.slice(0, 2) || []);
    setHomempageML(movie?.lists?.slice(0, 2) || []);
  }, [movie, series]);

  return { movieLists, seriesLists, homempageML, homempageSL };
};

export default useLists;
