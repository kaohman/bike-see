import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import BikeMap from '../BikeMap/BikeMap';
// import PopUp from '../../Components/PopUp/PopUp';
import { setCities } from '../../actions';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData } from '../../utils/api';
import '../../normalize.css';
import '../../main.scss';

class App extends Component {
  async componentDidMount() {
    try {
      const results = await fetchData('http://api.citybik.es/v2/networks');
      this.props.setCities(results.networks);
    } catch (error) {
      console.log(error)
    }
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
  setCities: (cities) => dispatch(setCities(cities)),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
