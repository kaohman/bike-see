import React, { Component } from 'react';
import Header from '../Header/Header';
import BikeMap from '../BikeMap/BikeMap';
// import PopUp from '../../Components/PopUp/PopUp';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCities } from '../../thunks/fetchCities';

class App extends Component {
  componentDidMount() {
    this.props.fetchCities();
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
        {/* <Route path="/login" render={() => <PopUp history={this.props.history} title='User Login'/>} /> */}
        {/* <Route path="/sign-up" render={() => <PopUp history={this.props.history} title='User Sign Up' />} /> */}
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchCities: (cities) => dispatch(fetchCities(cities)),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
