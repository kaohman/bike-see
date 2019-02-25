import React, { Component } from 'react';
import Header from '../Header/Header';
import BikeMap from '../BikeMap/BikeMap';
import PopUp from '../../Components/PopUp/PopUp';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStations } from '../../thunks/fetchStations';
import { fetchCities } from '../../thunks/fetchCities';
import { fetchFavorites } from '../../thunks/fetchFavorites';
import PropTypes from 'prop-types';
import { fetchUser } from '../../thunks/fetchUser';

export class App extends Component {

  getCurrentUser = () => {
    const { fetchUser, fetchFavorites } = this.props;
    if (localStorage.hasOwnProperty('bike-user')) {
      const savedUser = localStorage.getItem('bike-user');
      const parsedUser = JSON.parse(savedUser);
      fetchUser(parsedUser);
      fetchFavorites(parsedUser.id);
      fetchStations();
    }
  }

  componentDidMount() {
    this.props.fetchCities();
    this.getCurrentUser();
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
  fetchUser: (user) => dispatch(fetchUser(user)),
});

App.propTypes = {
  fetchCities: PropTypes.func,
  fetchStations: PropTypes.func,
  fetchFavorites: PropTypes.func,
  fetchUser: PropTypes.func,
}

export default withRouter(connect(null, mapDispatchToProps)(App));
