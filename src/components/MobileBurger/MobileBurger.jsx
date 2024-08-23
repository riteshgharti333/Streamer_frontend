// import React, { useContext } from "react";
// import { slide as Menu } from "react-burger-menu";
// import "./MobileBurger.scss";
// import { Context, baseUrl } from "../../main";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const MobileBurger = () => {
//   const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
//     useContext(Context);

//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");


//   const logoutHandler = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${baseUrl}/api/auth/logout`,
//         {
//           withCredentials: true,
//         }
//       );
//       toast.success(res.data.message);
//       setIsAuthenticated(false);
//       setLoading(false);
//       localStorage.removeItem("token");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setIsAuthenticated(true);
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <Menu right>
//         <a className="menu-item" href="/">
//           Home
//         </a>
//         <a className="menu-item" href="/movies">
//           Movies
//         </a>
//         <a className="menu-item" href="/series">
//           Web Series
//         </a>

//         {token ? (
//           <span onClick={logoutHandler}>Logout</span>
//         ) : (

//           <Link to="/login">
//           <span>Login</span>
//           </Link>
//         )}
//         <Link to="/subscriptions">
//         <button className="subscribe">Subscribe</button>

//         </Link>
//       </Menu>
//     </div>
//   );
// };

// export default MobileBurger;
