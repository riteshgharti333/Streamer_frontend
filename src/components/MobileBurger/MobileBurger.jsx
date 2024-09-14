import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./MobileBurger.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
const MobileBurger = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Menu right>
        <Link className="menu-item" href="/">
          Home
        </Link>
        <Link className="menu-item" href="/movies">
          Movies
        </Link>
        <Link className="menu-item" href="/series">
          Web Series
        </Link>
        {user ? (
          <Link to="/login">
            <span>Logout</span>
          </Link>
        ) : (
          <Link to="/login">
            <span>Login</span>
          </Link>
        )}

        <Link to="/subscriptions">
          <button className="Msubscribe">Subscribe</button>
        </Link>

        
        {user && (
            <Link to="/profile">
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
