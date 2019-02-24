import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../thunks/fetchUser';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        verifyPassword: '',
      },
      response: ''
    }
  }

  updateState = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    this.setState({ [id]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { login, fetchUser } = this.props;
    fetchUser(this.state.user, login);
  }

  render() {
    const { login } = this.props;
    const { user } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Email
          <input onChange={this.updateState} required type='text' placeholder='Enter your email' value={user.email} id='email'/>
        </label>
        <label>Password
          <input onChange={this.updateState} required type='password' placeholder='Enter your password' value={user.password} id='password'/>
        </label>
        {!login &&
          <label>Verify Password
            <input onChange={this.updateState} required type='password' placeholder='Enter your password' value={user.verifyPassword} id='verifyPassword'/>
          </label>
        }
        <button type='submit'>Submit</button>
        {login ? 
          <Link className='pop-up-link' to='/sign-up'>Sign Up Here</Link> : 
          <Link className='pop-up-link' to='/login'>Login Here</Link>
        }
        <p className='error-text hidden'>Please try again</p>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchUser: (user) => dispatch(fetchUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);