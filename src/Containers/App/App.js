import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import BikeMap from '../BikeMap/BikeMap';
import PopUp from '../../Components/PopUp/PopUp';
import { Route, Switch, withRouter } from 'react-router-dom';
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
        <Route path="/login" render={() => <PopUp history={this.props.history} title='User Login'/>} />
        <Route path="/trips" render={() => <PopUp history={this.props.history} title='My Trips' />} />
      </div>
    );
  }
}

export default withRouter(App);
