import "./navbar.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Context } from "../../main";
import { useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MobileBurger from "../MobileBurger/MobileBurger";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = scroll ? "navbar scrolled" : "navbar";

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`https://streamer-backend.onrender.com/api/auth/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={navbarClass}>
      <div className="container">
        <div className="left">
          <h1>
            <span className="f">STRE</span>
            <span className="s">AMER</span>
          </h1>
        </div>

        <div className="mobileSidebar">
          <MobileBurger />
        </div>

        <div className="right">
          {/* <Link to="/" className="link">
            <span className="navOptions"> Homepage </span> */}
          {/* </Link> */}
          <Link to="/movies" className="link">
            <span className="navOptions"> Series </span>
          </Link>
          <Link to="/series" className="link">
            <span className="navOptions"> Movies </span>
          </Link>
          <Link to="/subscriptions">
            <button className="subscribe">Subscribe</button>
          </Link>

          {
            isAuthenticated ? (
              <button className="button" onClick={logoutHandler}>
              Logout
            </button>

            ) : 
            <Link to="/login">
                <button className="button">
              Login
            </button>
            </Link>
          }
        

          {/* <div className="userPic">
           <BiSolidUser className="userIcon" />
          <div className="profile">
            <div className="options">
              <span>Settings</span>
        
              <span onClick={logoutHandler}>      Logout
            
              </span>
            </div>
          </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
