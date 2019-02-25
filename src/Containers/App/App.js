import React, { Component } from 'react';
import Header from '../Header/Header';
import BikeMap from '../BikeMap/BikeMap';
import PopUp from '../../Components/PopUp/PopUp';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStations } from '../../thunks/fetchStations';
import { fetchCities } from '../../thunks/fetchCities';
import { fetchFavorites } from '../../thunks/fetchFavorites';
import { setCurrentUser } from '../../actions';
import PropTypes from 'prop-types';

export class App extends Component {
  pullFromLocalStorage = () => {
    // if (localStorage.hasOwnProperty('bike-stops')) {
    //   const savedStops = localStorage.getItem('bike-stops');
    //   const favorites = JSON.parse(savedStops);
    //   this.props.setFavorites(favorites);
    // }

    if (localStorage.hasOwnProperty('current-city')) {
      const savedCity = localStorage.getItem('current-city');
      const currentCity = JSON.parse(savedCity);
      this.props.fetchStations(currentCity);
    }
  }

  getCurrentUser = () => {
    const { setCurrentUser, fetchFavorites } = this.props;
    if (localStorage.hasOwnProperty('bike-user')) {
      const savedUser = localStorage.getItem('bike-user');
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      // fetchUser(parsedUser, true);
      fetchFavorites(parsedUser.id);
    }
  }

  componentDidMount() {
    this.props.fetchCities();
    this.getCurrentUser();
    this.pullFromLocalStorage();
  }

  render() {
    return (
      <div id='app-div'>
        <Header />
        <Switch>
          <Route path='/' component={BikeMap} />
          <Route path='/stations' component={BikeMap} />
          <Route path='/my-stops' component={BikeMap} />
        </Switch>
        <Route path="/login" render={() => <PopUp history={this.props.history} title='User Login'/>} />
        <Route path="/sign-up" render={() => <PopUp history={this.props.history} title='User Sign Up' />} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchCities: (cities) => dispatch(fetchCities(cities)),
  fetchStations: (stations) => dispatch(fetchStations(stations)),
  fetchFavorites: (user) => dispatch(fetchFavorites(user)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

App.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  fetchStations: PropTypes.func.isRequired,
}

export default withRouter(connect(null, mapDispatchToProps)(App));
