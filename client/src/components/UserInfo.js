import React, {Component} from 'react';
import './style.css';

const UserInfo = ({user, logout}) => {
  return (
    <div className='container'>
			<div className='row ml-2'><div className='col'>
		    <h5>
					{user}
					<button className="ml-2 btn btn-primary" onClick={logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
				</h5>
			</div></div>
		</div>
	);
}

export default UserInfo;