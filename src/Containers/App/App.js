import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import BikeMap from '../BikeMap/BikeMap';
import PopUp from '../PopUp/PopUp';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import '../../normalize.css';
import '../../main.scss';

class App extends Component {
  componentDidMount() {
    console.log('loading...')
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={BikeMap} />
          <Route exact path='/login' component={BikeMap} />
          <Route exact path='/stations' component={BikeMap} />
          <Route exact path='/cities' component={BikeMap} />
          <Route exact path='/trips' component={BikeMap} />
        </Switch>
        <Route path="/login" render={() => <PopUp title='User Login'/>} />
        <Route path="/trips" render={() => <PopUp title='My Trips' />} />
      </div>
    );
  }
}

export default withRouter(App);
