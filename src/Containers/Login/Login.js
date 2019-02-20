import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

  render() {
    const { login } = this.props;
    return (
      <form>
        <label>Email
          <input required type='text' placeholder='Enter your email' />
        </label>
        <label>Password
          <input required type='password' placeholder='Enter your password' />
        </label>
        {!login &&
          <label>Verify Password
            <input required type='password' placeholder='Enter your password' />
          </label>
        }
        <button type='submit'>Submit</button>
        {login ? 
          <Link className='pop-up-link' to='/sign-up'>Sign Up Here</Link> : 
          <Link className='pop-up-link' to='/login'>Login Here</Link>
        }
        <p className='hidden'>Please try again</p>
      </form>
    )
  }
}

export default Login;