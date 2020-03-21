import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import LoginForm from './LoginForm';
import StudentHome from './StudentHome';
import InstructorHome from './InstructorHome';
import PeerSubmission from './PeerSubmission';
import {PrivateRoute} from './routes.js';
import {AuthButton} from './Authentification';
// export default wrapper;

export default function App () {
	return (
	    <Router>
	      <div>
	      <AuthButton/>
	        <ul>
				<li><Link to="/studentHome">Student Home Page</Link></li>
				<li><Link to="/instructorHome">Instructor Home Page</Link></li>
				<li><Link to="/login">Login Page</Link></li>
				<li><Link to="/peerSubmission">Peer Review Submission Page</Link></li>
				
	        </ul>

			<Route path="/login" component={LoginForm} />
			<Route path="/peerSubmission" component={PeerSubmission}/>
	        <PrivateRoute path='/studentHome' component={StudentHome} />
	        <PrivateRoute path='/instructorHome' component={InstructorHome} />
	      
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

