import "./navbar.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileBurger from "../MobileBurger/MobileBurger";
import { FaUser } from "react-icons/fa";
import { genre } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsyncUser } from "../../redux/asyncThunks/authThunks";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logoutAsyncUser());
    navigate("/login");
  };

  const navbarClass = scroll ? "navbar scrolled" : "navbar";

  return (
    <div className={navbarClass}>
      <div className="container">
        <div className="left">
          <Link to={"/"}>
            <h1>STREAMER</h1>
          </Link>
        </div>

        <div className="right">
          <div className="mobileSidebar navOptions">
            <MobileBurger />
          </div>

          <span className="navOptions homepageLink">
            <Link to={"/"}>Homepage</Link>
          </span>
          <span className="navOptions moviesLink">
            <Link to={"/movies"}>Movies</Link>
            <div className="genre">
              {genre.map((g) => (
                <span key={g} value={g}>
                  <Link to={`/query?type=movies&genre=${g}`}>{g} Movies</Link>
                </span>
              ))}
            </div>
          </span>

          <span className="navOptions seriesLink">
            <Link to={"/series"}>Series</Link>
            <div className="genre">
              {genre.map((g) => (
                <span key={g} value={g}>
                  <Link to={`/query?type=series&genre=${g}`}>{g} Series</Link>
                </span>
              ))}
            </div>
          </span>

          <Link to="/subscriptions">
            <button className="subscribe">Subscriptions</button>
          </Link>
          {user ? (
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
          )}

          {user && (
            <Link to="/profile">
              <div className="user">
                <FaUser className="userIcon" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
