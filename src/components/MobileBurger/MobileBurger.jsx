import React, { useContext } from 'react'
import { slide as Menu } from 'react-burger-menu'
import "./MobileBurger.scss"
import { Context } from '../../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MobileBurger = () => {

  
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
      Navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
      console.log(error)
    }
  };

  return (
    <div>
      <Menu right>
        <a className="menu-item" href="/">Home</a>
        <a className="menu-item" href="/movies">Movies</a>
        <a  className="menu-item" href="/series">Web Series</a>
        <span onClick={logoutHandler} >Logout</span>
        <button className="subscribe">Subscribe</button>
      </Menu>
    </div>
  )
}

export default MobileBurger
