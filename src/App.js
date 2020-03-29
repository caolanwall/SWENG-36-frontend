import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import LoginForm from './Components/LoginForm';
import AssignmentLandingPage from './Student/AssignmentHome';
import StudentHome from './Student/StudentHome';
import InstructorHome from './Instructor/InstructorHome';
import InstructorModuleDetails from './Instructor/InstructorModuleDetails';
import PeerSubmission from './Student/PeerSubmission';
import PDFView from './Components/PDFView';
import Upload from './Components/Upload';
import FeedbackReview from './Components/FeedbackReview';
import CommentsDisplay from './Components/CommentsDisplay';
import {PrivateRoute} from './routes.js';
import {AuthButton} from './Components/Authentification';

export default function App () {
	return (
		<Router>
		<div>

		<Switch>
		<Route path="/peerSubmission" component={PeerSubmission}/>
		<Route path="/pdfView" component={PDFView}/>
		<Route path="/upload" component={Upload}/>
		<Route path="/FeedbackReview" component={FeedbackReview} />
		<Route path="/feedback/comments" component={CommentsDisplay} />
		<Route path="/login" component={LoginForm} />
		<Route path='/students/:username/:assId' component={AssignmentLandingPage} />
		<Route path='/instructors/:username/modules/:moduleName' component={InstructorModuleDetails} />
		<PrivateRoute path='/students/:username' component={StudentHome} />
		<PrivateRoute path='/instructors/:username' component={InstructorHome} />
		<Route exact path="/" render={() => (<Redirect to="/login" />)} />
		</Switch>
		</div>
		</Router>
	);
}

//Below not needed but didn't want to completely delete.
/*<ul>
<li><Link to="/peerSubmission">Peer Review Submission Page</Link></li>
<li><Link to ={{
  pathname:"/pdfView",
    docName:"/example.pdf"
}} className = "nav'link">
PDF
</Link>
</li>
<li> <Link to="/upload">Upload Page</Link></li>
</ul>*/
