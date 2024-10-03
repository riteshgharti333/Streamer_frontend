export const priceIdMapping = {
  movies: import.meta.env.VITE_MOVIE_KEY,
  webSeries: import.meta.env.VITE_SERIES_KEY,
  combo: import.meta.env.VITE_MOVIE_SERIES_KEY,
};

export const getContentTypeFromPriceId = (priceId) => {
  if (priceId === priceIdMapping.movies) return "movies";
  if (priceId === priceIdMapping.webSeries) return "web series";
  if (priceId === priceIdMapping.combo) return "combo";
  return null;
};
