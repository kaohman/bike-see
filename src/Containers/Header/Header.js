import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const Header = ({ currentCity, loading, location }) => {
  const setSubheader = () => {
    if (loading) {
      return <h3 className='loading-text'>Loading Data...</h3>
    }

    if (!loading) {
      switch (location.pathname) {
        case '/':
          return <div>
              <h3 className='loading-text'>A bike share sightseeing app.</h3>
              <h3 className='loading-text'>Click on a purple city icon to view a bike share network and get started.</h3>
            </div>
        default:
          return currentCity === '' ?
            <h3 className='loading-text'>Choose a city to view stations</h3> :
            <h3 className='loading-text'>Viewing: {currentCity.toUpperCase()}</h3>
      }
    }
  }

  return (
    <header>
      <div className='title-div'>
        <NavLink id='title' to='/'>BikeSee</NavLink>
        {setSubheader()}
      </div>
      <nav>
        {/* <NavLink className='nav-links' to='/login'>
          <i className="fas fa-user"></i>
          <div>Login</div>
        </NavLink> */}
        <NavLink exact className='nav-links' to='/'>
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
  loading: state.loading,
  currentCity: state.currentCity,
});

export default withRouter(connect(mapStateToProps)(Header));