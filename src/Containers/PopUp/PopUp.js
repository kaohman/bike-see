import React from 'react';
import Login from '../Login/Login';
import { connect } from 'react-redux';
import { setError } from '../../actions';
import PropTypes from 'prop-types';

export const PopUp = (props) => {
  const closePopUp = () => {
    const { history, setError } = props;
    setError('');
    history.replace('/');
  }

  return (
    <div className='overlay-div'>
      <div className='login-pop-up'>
        <i onClick={closePopUp} className="fas fa-times close-icon"></i>
        <h3>{props.title}</h3>
        {props.title === 'User Login' && <Login history={props.history} login={true}/>}
        {props.title === 'User Sign Up' && <Login history={props.history} login={false}/>}
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError(error))
});

PopUp.propTypes = {
  setError: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(PopUp);