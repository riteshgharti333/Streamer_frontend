// import { Link, useLocation } from "react-router-dom";
// import YouTube from "react-youtube";
// import "./Watch.scss";
// import { BsArrowLeft } from "react-icons/bs";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../../main";

// const Watch = () => {
//   const location = useLocation();
//   const path = location.pathname.split("/")[2];

//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     const getMovie = async () => {
//       const res = await axios.get(`${baseUrl}/api/movies/${path}`);
//       setMovie(res.data.getMovie);
//     };
//     getMovie();
//   }, [path]);

//   const sm = window.innerWidth;

//   const opts = {
//     height: sm <= 480 ? "100%" : "390",
//     width: sm <= 480 ? "100%" : "640",
//     playerVars: {
//       autoplay: 0,
//     },
//   };

//   return (
//     <div className="watch">
//       <div className="WatchIcon">
//         <Link to="/">
//           <BsArrowLeft className="backIcon" />
//         </Link>
//       </div>
//       <div className="video">
//         {/* Commented out the video element */}
//         {/* <video src={movie.video} controls autoPlay muted></video> */}
//         {movie.video && (
//           <YouTube videoId={movie.video.split("v=")[1]} opts={opts} />
//         )}
//       </div>
//       <div className="watchInfo">
//         <h1>{movie.title}</h1>
//         <p>{movie.desc}</p>
//         <span>{movie.year}</span>
//         <span className="line">|</span>
//         <span>{movie.age}+</span>
//         <span className="line">|</span>
//         <span>{movie.genre}</span>
//       </div>
//     </div>
//   );
// };

// export default Watch;
