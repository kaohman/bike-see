import React, { Component } from 'react';
import Header from '../Header/Header';
import BikeMap from '../BikeMap/BikeMap';
import PopUp from '../PopUp/PopUp';
import NotFound from '../../Components/NotFound/NotFound';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../../thunks/fetchUser';

export class App extends Component {

  getCurrentUser = () => {
    const { fetchUser } = this.props;
    if (localStorage.hasOwnProperty('bike-user')) {
      const savedUser = localStorage.getItem('bike-user');
      const parsedUser = JSON.parse(savedUser);
      fetchUser(parsedUser);
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    return (
      <div id='app-div'>
        <Header />
        <Switch>
          <Route path='bike-see/not-found' component={NotFound} />
          <Route path='bike-see/' component={BikeMap} />
          <Route path='bike-see/my-stops' component={BikeMap} />
        </Switch>
        <Switch>
          <Route path='bike-see/login' render={() => <PopUp history={this.props.history} title='User Login'/>} />
          <Route path='bike-see/sign-up' render={() => <PopUp history={this.props.history} title='User Sign Up' />} />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchUser: (user) => dispatch(fetchUser(user)),
});

App.propTypes = {
  fetchUser: PropTypes.func,
}

export default withRouter(connect(null, mapDispatchToProps)(App));
