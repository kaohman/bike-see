import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <header>
      <NavLink id='title' to='/'>BikeSee</NavLink>
      <nav>
        {/* <NavLink className='nav-links' to='/login'>
          <i className="fas fa-user"></i>
          <div>Login</div>
        </NavLink> */}
        <NavLink className='nav-links' to='/cities'>
          <i className="fas fa-map-marker-alt"></i>
          <div>Cities</div>
        </NavLink>
        <NavLink className='nav-links' to='/stations'>
          <i className="fas fa-bicycle"></i>
          <div>Stations</div>
        </NavLink>
        <NavLink className='nav-links' to='/my-places'>
          <i className="fas fa-clipboard-list"></i>
          <div>My Places</div>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header;