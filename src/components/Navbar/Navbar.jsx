import "./navbar.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileBurger from "../MobileBurger/MobileBurger";
import { FaUser } from "react-icons/fa";
import { genre } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsyncUser } from "../../redux/asyncThunks/authThunks";
import { IoMdArrowDropdown } from "react-icons/io";

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

  const handleGenreChange = (e, type) => {
    const selectedGenre = e.target.value;
    if (selectedGenre) {
      // Redirect to the /movies page with the selected genre
      navigate(`/${type}?genre=${selectedGenre}`);
    }
  };

  const handleLinkClick = () => {
    navigate(`/query?type=movies&genre=${g}`);
  };

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

        <div className="right">


        <div className="mobileSidebar" >
          <MobileBurger />
        </div>


          <span className="navOptions">
            <Link to={"/"} className="homepageLink">
              Homepage
            </Link>
          </span>
          <span className="navOptions">
            <Link to={"/movies"}>Movies</Link>
            <div className="genre">
              {genre.map((g) => (
                <span key={g} value={g}>
                  <Link
                    to={`/query?type=movies&genre=${g}`}
                    onClick={handleLinkClick}
                  >
                    {g} Movies
                  </Link>
                </span>
              ))}
            </div>
          </span>

          <span className="navOptions">
            <Link to={"/series"}  className="seriesLink">Series</Link>
            <div className="genre">
              {genre.map((g) => (
                <span key={g} value={g}>
                  <Link
                    to={`/query?type=series&genre=${g}`}
                    onClick={handleLinkClick}
                  >
                    {g} Series
                  </Link>
                </span>
              ))}
            </div>
          </span>

        

          <Link to="/subscriptions">
            <button className="subscribe">Subscribe</button>
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
