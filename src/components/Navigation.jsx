import React from "react"
import { Link } from "react-router-dom";
import "../bootstrap.min.css";

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <Link to="/Popular"><li className="nav-item">Popular</li></Link>
        <Link to="/Top_rated"><li className="nav-item">Top Rated</li></Link>
        <Link to="/Now_playing"><li className="nav-item">Now Playing</li></Link>
        <Link to="/Upcoming"><li className="nav-item">Upcoming Movies</li></Link>
        <Link to="/About" ><li className="nav-item">About</li></Link>
        <Link to="/Discover"><li className="nav-item">Discover</li></Link>
        <Link to="/Favorites"><li className="nav-item">Favorites</li></Link>
        <Link to="/Rating"><li className="nav-item">My Rated Movies</li></Link>
      </ul>
    </nav>
  )
}

export default Navigation;