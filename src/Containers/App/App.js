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
      <div>
        <Header />
        <Switch>
          <Route path='/' component={BikeMap} />
          <Route path='/cities' render={() => <BikeMap history={this.props.history} />} />
          <Route path='/stations' render={() => <BikeMap history={this.props.history} />} />
          <Route path='/my-places' render={() => <BikeMap history={this.props.history} />} />
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
