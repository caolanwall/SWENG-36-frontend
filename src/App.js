import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import LoginForm from './LoginForm';
import AssignmentLandingPage from './AssignmentHome';
import StudentHome from './StudentHome';
import InstructorHome from './InstructorHome';
import PeerSubmission from './PeerSubmission';
import PDFView from './PDFView';
import Upload from './Upload';
import {PrivateRoute} from './routes.js';
import {AuthButton} from './Authentification';

export default function App () {
	return (
	    <Router>
	      <div>
	        <ul>
				<li><Link to="/peerSubmission">Peer Review Submission Page</Link></li>
       			<li><Link to ={{
                                pathname:"/pdfView",
                                docName:"/example.pdf"
                            }} className = "nav'link">
                      PDF
              		</Link>
              	</li>
          		<li> <Link to="upload">Upload Page</Link></li>
	        </ul>
	        <Switch>
				<Route path="/peerSubmission" component={PeerSubmission}/>
	      		<Route path="/pdfView" component={PDFView}/>
	      		<Route path="/upload" component={Upload}/>
		        
				<Route path="/login" component={LoginForm} />
				<Route path='/students/:username/:assId' component={AssignmentLandingPage} />
		        <PrivateRoute path='/students/:username' component={StudentHome} />
		        <PrivateRoute path='/instructors/:username' component={InstructorHome} />
		        <Route exact path="/" render={() => (<Redirect to="/login" />)} />          
	        </Switch>
	      </div>
	    </Router>
	    );
}

