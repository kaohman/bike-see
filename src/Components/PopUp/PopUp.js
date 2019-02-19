import React from 'react';
import Login from '../../Containers/Login/Login';
// import Trips from '../../Containers/Trips/Trips';

const PopUp = (props) => {
  return (
    <div className='overlay-div'>
      <div onBlur={() => props.history.push('/')} className='login-pop-up'>
        <h3>{props.title}</h3>
        {props.title === 'User Login' && <Login />}
      </div>
    </div>
  )
}

export default PopUp;