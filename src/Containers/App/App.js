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
          <Route path='/' component={BikeMap} />
          <Route path="/stations" render={() => <BikeMap history={this.props.history} />} />
          <Route path="/cities" render={() => <BikeMap history={this.props.history} />} />
          <Route path="/cities" render={() => <BikeMap history={this.props.history} />} />
        </Switch>
        <Route path="/my-trips" render={() => <BikeMap history={this.props.history} />} />
        {/* <Route path="/login" render={() => <PopUp history={this.props.history} title='User Login'/>} /> */}
        {/* <Route path="/sign-up" render={() => <PopUp history={this.props.history} title='User Sign Up' />} /> */}
      </div>
    );
  }
}

export default withRouter(App);
