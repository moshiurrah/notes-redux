import React, {Component} from 'react';
import './style.css';

const ErrorFooter = ({errMsg=''}) => {
  //console.log(errMsg)
  return (
    <div>
  	{errMsg !=='' && (<div className="alert alert-danger mt-4 fixed-bottom">{errMsg}</div>)}
  	</div>
  )
}

export default ErrorFooter;