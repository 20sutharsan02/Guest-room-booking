// Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './footercss.css'; // Import your CSS file for styling
import Footer from './Footer'


const Navbar = ({login}) => {
  const navigate=useNavigate();
  const mm=()=>{
    if(login)
    {
      navigate('/client')
    }
    else{
      alert("plse login")
    }
  }
  const mmr=()=>{
    if(login)
    {
      navigate('/client')
    }
    else{
      alert("plse login")
    }
  }
  const mma=()=>{
    if(login)
    {
      navigate('/client')
    }
    else{
      alert("plse login")
    }
  }
  const mmc=()=>{
    if(login)
    {
      navigate('/client')
    }
    else{
      alert("plse login")
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/">My Bookie</a>
        </div>
        <ul className="nav-links">
          <li><a onClick={()=>{mm()}}>Home</a></li>
          <li><a onClick={()=>{mmr()}}>Rooms</a></li>
          <li><a onClick={()=>{mma()}}>About Us</a></li>
          <li><a onClick={()=>{mmc()}}>Contact</a></li>
        </ul>
      </div>
    </nav>
    
  );
};

export default Navbar;
