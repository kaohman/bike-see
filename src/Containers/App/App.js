import React, { Component } from 'react';
import Header from '../Header/Header';
import BikeMap from '../BikeMap/BikeMap';
import PopUp from '../PopUp/PopUp';
import NotFound from '../../Components/NotFound/NotFound';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExistingUser } from '../../thunks/fetchExistingUser';

export class App extends Component {

  getCurrentUser = () => {
    const { fetchExistingUser } = this.props;
    if (localStorage.hasOwnProperty('bike-user')) {
      const savedUser = localStorage.getItem('bike-user');
      const parsedUser = JSON.parse(savedUser);
      fetchExistingUser(parsedUser.id);
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
          <Route path='/not-found' component={NotFound} />
          <Route path='/' component={BikeMap} />
          <Route path='/my-stops' component={BikeMap} />
        </Switch>
        <Switch>
          <Route path='/login' render={() => <PopUp history={this.props.history} title='User Login'/>} />
          <Route path='/sign-up' render={() => <PopUp history={this.props.history} title='User Sign Up' />} />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchExistingUser: (id) => dispatch(fetchExistingUser(id)),
});

App.propTypes = {
  fetchUser: PropTypes.func,
}

export default withRouter(connect(null, mapDispatchToProps)(App));
