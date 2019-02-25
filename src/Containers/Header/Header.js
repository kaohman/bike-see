import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setCurrentUser } from '../../actions';

export const Header = ({ currentCity, loading, location, user, setCurrentUser }) => {
  const signOut = () => {
    setCurrentUser({});
    localStorage.removeItem('bike-user');
  }

  const setSubheader = () => {
    if (loading) {
      return <h3 className='loading-text'>Loading Data...</h3>
    }

    if (!loading) {
      switch (location.pathname) {
        case '/':
          return <div>
              <h3 className='loading-text'>A bike share sightseeing app.</h3>
              <h3 className='loading-text large-screens'>Click on a purple city icon to view a bike share network and get started.</h3>
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
        <NavLink exact className='nav-links' to='/'>
          <i className='fas fa-map-marker-alt'></i>
          <div>Cities</div>
        </NavLink>
        <NavLink exact className='nav-links' to='/stations'>
          <i className='fas fa-bicycle'></i>
          <div>Stations</div>
        </NavLink>
        <NavLink className='nav-links' to='/my-stops'>
          <i className='fas fa-clipboard-list'></i>
          <div>My Stops</div>
        </NavLink>
        {user.name ?
          <NavLink onClick={signOut} className='nav-links' to='/'>
            <i className='fas fa-user'></i>
            <div>Sign Out</div>
          </NavLink> :
          <NavLink className='nav-links' to='/login'>
            <i className='fas fa-user'></i>
            <div>Login</div>
          </NavLink>
        }
      </nav>
    </header>
  )
}

export const mapStateToProps = (state) => ({
  loading: state.loading,
  currentCity: state.currentCity,
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

Header.propTypes = {
  loading: PropTypes.bool,
  currentCity: PropTypes.string,
  user: PropTypes.object,
  setCurrentUser: PropTypes.func,
}

Header.defaultProps = {
  loading: true,
  currentCity: '',
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));