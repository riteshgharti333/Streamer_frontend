import spider from "../assets/images/spider.jpg";
import sg from "../assets/images/sg.jpg";
import st from "../assets/images/st.jpg";

export const subscriptionsPlans = [
  {
    name: "movies subscription",
    price: "₹ 900 / Month",
    priceId: import.meta.env.VITE_MOVIE_KEY,
    image: spider,
  },
  {
    name: "web series subscription",
    price: "₹ 700 / Month",
    priceId: import.meta.env.VITE_SERIES_KEY,
    image: st,
  },
  {
    name: "movies + web series subscription",
    price: "₹1500 / Month",
    priceId: import.meta.env.VITE_MOVIE_SERIES_KEY,
    image: sg,
  },
];

export const genre = [
  "Action",
  "Adventure",
  "Anime",
  "Animation",
  "TV Dramas",
  "Documentaries",
  "Horror",
  "Romantic",
  "Sci-fi",
  "Fantasy",
  "Sports",
  "Thrillers",
];
