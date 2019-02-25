import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../thunks/fetchUser';
import { postUser } from '../../thunks/postUser';
import { setError } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      verifyPassword: ''
    }
  }

  clearError = () => {
    this.props.setError('');
  }

  updateState = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === 'email') {
      this.setState({ [id]: value.toLowerCase() })
    } else {
      this.setState({ [id]: value })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.clearError('');
    const { login, fetchUser, postUser } = this.props;
    const { name, email, password} = this.state;
    login ? await fetchUser({email, password}) : await postUser({name, email, password});
    this.updatePath();
  }
  
  updatePath = () => {
    const { error, history } = this.props;
    if (error === '') {
      history.replace('/');
    }
  }

  render() {
    const { login, error } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        {!login &&
          <label>Name
            <input onChange={this.updateState} required type='text' placeholder='Enter your name' id='name' />
          </label>
        }
        <label>Email
          <input onChange={this.updateState} required type='email' placeholder='Enter your email'  id='email'/>
        </label>
        <label>Password
          <input onChange={this.updateState} required type='password' placeholder='Enter your password' id='password'/>
        </label>
        {!login &&
          <label>Verify Password
            <input onChange={this.updateState} required type='password' placeholder='Enter your password' id='verifyPassword'/>
          </label>
        }
        <button type='submit'>Submit</button>
        {login ? 
          <Link onClick={this.clearError} className='pop-up-link' to='/sign-up'>Sign Up Here</Link> : 
          <Link onClick={this.clearError} className='pop-up-link' to='/login'>Login Here</Link>
        }
        {login ?
          error !== '' && <p className='error-text'>Login Unsuccessful. Please sign up or try again.</p> :
          error !== '' && <p className='error-text'>Sign up unsuccessful. Please try again.</p>
        }
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  error: state.error,
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchUser: (user) => dispatch(fetchUser(user)),
  setError: (error) => dispatch(setError(error)),
  postUser: (user) => dispatch(postUser(user)),
});

Login.propTypes = {
  error: PropTypes.string,
  user: PropTypes.object,
  fetchUser: PropTypes.func,
  setError: PropTypes.func,
  postUser: PropTypes.func,
}

Login.defaultProps = {
  error: '',
  user: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);