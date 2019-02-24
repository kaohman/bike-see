import React from 'react';
import Login from '../../Containers/Login/Login';
// import Trips from '../../Containers/Trips/Trips';

const PopUp = (props) => {
  return (
    <div className='overlay-div'>
      <div className='login-pop-up'>
        <i onClick={() => props.history.replace('/')} className="fas fa-times close-icon"></i>
        <h3>{props.title}</h3>
        {props.title === 'User Login' && <Login history={props.history} login={true}/>}
        {props.title === 'User Sign Up' && <Login history={props.history} login={false}/>}
      </div>
    </div>
  )
}

export default PopUp;