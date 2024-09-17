import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "./MobileBurger.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { genre } from "../../assets/data";
import { logoutAsyncUser } from "../../redux/asyncThunks/authThunks";

const MobileBurger = () => {
  const { user } = useSelector((state) => state.auth);
  const [openDropdown, setOpenDropdown] = useState(""); 
  const [isOpen, setIsOpen] = useState(false); 


  const dispatch = useDispatch();

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? "" : dropdown);
  };



  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutAsyncUser());
    navigate("/login");
  };

  return (
    <div>
      <Menu right isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)}>
        <Link className="menu-item" to="/" onClick={handleCloseMenu}>
          Home
        </Link>

        {/* Movies Dropdown */}
        <div className="mLink">
          <Link className="menu-item mMovieslinkLink" to={"/movies"}>
            Movies
          </Link>
          {openDropdown === "movies" ? (
            <>
              <KeyboardArrowUpIcon
                className="mIcon"
                onClick={() => toggleDropdown("movies")}
              />
              {genre.map((g, index) => (
                <span key={index}>
                  <Link
                    to={`/query?type=movies&genre=${g}`}
                    onClick={handleCloseMenu}
                  >
                    {g} Movies
                  </Link>
                </span>
              ))}
            </>
          ) : (
            <KeyboardArrowDownIcon
              className="mIcon"
              onClick={() => toggleDropdown("movies")}
            />
          )}
        </div>

        {/* Web Series Dropdown */}
        <div className="mLink">
          <Link className="menu-item mSeriesLink" to={"/series"}>
            Web Series
          </Link>
          {openDropdown === "series" ? (
            <>
              <KeyboardArrowUpIcon
                className="mIcon"
                onClick={() => toggleDropdown("series")}
              />
              {genre.map((g, index) => (
                <span key={index}>
                  <Link
                    to={`/query?type=series&genre=${g}`}
                    onClick={handleCloseMenu}
                  >
                    {g} Series
                  </Link>
                </span>
              ))}
            </>
          ) : (
            <KeyboardArrowDownIcon
              className="mIcon"
              onClick={() => toggleDropdown("series")}
            />
          )}
        </div>

        {user ? (
         <Link to="/login" onClick={() => { handleCloseMenu(); handleLogout(); }}>
            <span>Logout</span>
          </Link>
        ) : (
          <Link to="/login" onClick={handleCloseMenu}>
            <span>Login</span>
          </Link>
        )}

        <Link to="/subscriptions" onClick={handleCloseMenu}>
          <button className="Msubscribe">Subscribe</button>
        </Link>

        {user && (
          <Link to="/profile" onClick={handleCloseMenu}>
            <div className="Muser">
              <FaUser className="userIcon" />
            </div>
          </Link>
        )}
      </Menu>
    </div>
  );
};

export default MobileBurger;
