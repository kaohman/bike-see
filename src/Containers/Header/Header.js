import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setCurrentUser, setStations, setFavorites } from '../../actions';

export const Header = ({ loading, location, user, setCurrentUser, setFavorites, setCurrentCity, setStations }) => {
  const signOut = () => {
    setCurrentUser({});
    setFavorites([]);
    localStorage.removeItem('bike-user');
  }

  const setSubheader = () => {
    if (loading) {
      return <h3 className='loading-text'>Loading Data...</h3>
    }

    if (!loading) {
      switch (location.pathname) {
        case '/':
          return <h3 className='loading-text'>Click on a bike icon to view a station and get started.</h3>
        case '/my-stops':
          return !user.name && <h3 className='loading-text'>Login to view My Stops</h3>
        default:
          return
      }
    }
  }

  return (
    <header>
      <div className='header-div'>
        <div className='title-div'>
          <NavLink id='title' to='/'>BikeSee</NavLink>
          <div>
            <h3 className='loading-text'>
              {user.name ? `Welcome ${user.name}` : ''}
            </h3>
            {setSubheader()}
          </div>
        </div>
        <nav>
          <NavLink exact className='nav-links' to='/'>
            <i className='fas fa-bicycle'></i>
            <div>Stations</div>
          </NavLink>
          <NavLink className='nav-links' to='/my-stops'>
            <i className='fas fa-clipboard-list'></i>
            <div>My Stops</div>
          </NavLink>
          {user.name ?
            <Link onClick={signOut} id='sign-out' className='nav-links' to='/'>
              <i className='fas fa-user'></i>
              <div>Sign Out</div>
            </Link> :
            <NavLink className='nav-links' to='/login'>
              <i className='fas fa-user'></i>
              <div>Login</div>
            </NavLink>
          }
        </nav>
      </div>
    </header>
  )
}

export const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setStations: (stations) => dispatch(setStations(stations)),
  setFavorites: (favorites) => dispatch(setFavorites(favorites)),
});

Header.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  setCurrentUser: PropTypes.func,
  setStations: PropTypes.func,
}

Header.defaultProps = {
  loading: true,
  user: {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));