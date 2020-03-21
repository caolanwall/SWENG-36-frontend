import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import {PrivateRoute} from './routes.js';
import {AuthButton} from './Authentification';
// export default wrapper;

export default function App () {
	return (
	    <Router>
	      <div>
	      <AuthButton/>
	        <ul>
	          <li><Link to="/home">Home Page</Link></li>
	          <li><Link to="/login">Login Page</Link></li>
	        </ul>

	        <Route path="/login" component={LoginForm}/>
	        <PrivateRoute path='/home' component={HomeScreen} />
	      
	      </div>
	    </Router>
	    );
}

// function wrapper(){
// 	return(<div align="center">
// 		<LoginForm />
// 		</div>
// 	);
// }

