import "./navbar.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import MobileBurger from "../MobileBurger/MobileBurger";
import { FaUser } from "react-icons/fa";

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

  return (
    <div className={navbarClass}>
      <div className="container">
        <div className="left">
          <Link to={"/"}>
            <h1>
              <span className="f">STRE</span>
              <span className="s">AMER</span>
            </h1>
          </Link>
        </div>

        <div className="mobileSidebar">
          {/* <MobileBurger /> */}
        </div>

        <div className="right">
          {/* <Link to="/" className="link">
            <span className="navOptions"> Homepage </span> */}
          {/* </Link> */}
          <Link to="/series" className="link">
            <span className="navOptions"> Series </span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navOptions"> Movies </span>
          </Link>
          <Link to="/subscriptions">
            <button className="subscribe">Subscribe</button>
          </Link>

            <button className="button">Logout</button>
       
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
          <Link to="/profile">
            <div className="user">
              <FaUser className="userIcon" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
