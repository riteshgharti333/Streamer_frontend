export const priceIdMapping = {
    movies: "price_1Pt0FASGN61YzC6ZVsLPr87B",
    webSeries: "price_1Pt0D9SGN61YzC6Za7Por7Fy",
    combo: "price_1Pt0G5SGN61YzC6ZzRoweliJ"
  };
  
  export const getContentTypeFromPriceId = (priceId) => {
    if (priceId === priceIdMapping.movies) return "movies";
    if (priceId === priceIdMapping.webSeries) return "web series";
    if (priceId === priceIdMapping.combo) return "combo";
    return null;
  };