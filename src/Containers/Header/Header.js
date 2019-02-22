import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const Header = (props) => {

  return (
    <header>
      <div className='title-div'>
        <NavLink id='title' to='/'>BikeSee</NavLink>
        {props.loading && <h3 className='loading-text'>Loading Data...</h3>}
      </div>
      <nav>
        {/* <NavLink className='nav-links' to='/login'>
          <i className="fas fa-user"></i>
          <div>Login</div>
        </NavLink> */}
        <NavLink exact className='nav-links' to='/cities'>
          <i className="fas fa-map-marker-alt"></i>
          <div>Cities</div>
        </NavLink>
        <NavLink exact className='nav-links' to='/stations'>
          <i className="fas fa-bicycle"></i>
          <div>Stations</div>
        </NavLink>
        <NavLink className='nav-links' to='/my-stops'>
          <i className="fas fa-clipboard-list"></i>
          <div>My Stops</div>
        </NavLink>
      </nav>
    </header>
  )
}

export const mapStateToProps = (state) => ({
  loading: state.loading
});

export default withRouter(connect(mapStateToProps)(Header));