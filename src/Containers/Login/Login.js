import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {


  render() {
    return (
      <form>
        <label>Email
          <input type='text' placeholder='Enter your email' />
        </label>
        <label>Password
          <input type='text' placeholder='Enter your password' />
        </label>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default Login;