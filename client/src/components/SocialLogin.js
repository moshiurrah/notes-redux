import React, {Component} from 'react';
import './style.css';

// Functional Component
const SocialLogin = ({app_url}) => {
  return (
    <div>
        <p className="mt-4">Or log in with one of the below services:</p>
        <a href={app_url+"/auth/facebook/"} target="">
        {/*<a href='#' target="">*/}
        	<button className="btn">
          	<i className="fa fa-facebook" aria-hidden="true"></i>
        	</button>
        </a>
        <a href={app_url+"/auth/github/"} target="">
        	<button className="ml-2 btn">
          	<i className="fa fa-github" aria-hidden="true"></i>
        	</button>
        </a>
    </div>
  );
};

export default SocialLogin;