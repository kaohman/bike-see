import React, { Component } from 'react';

class Login extends Component {

  render() {
    return (
      <div className='overlay-div'>
        <div className='login-pop-up'>
          <h3>{this.props.title}</h3>
          <form>
            
          </form>
        </div>
      </div>
    )
  }
}

export default Login;