import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import LoginForm from './Components/LoginForm';
import AssignmentLandingPage from './Student/AssignmentHome';
import StudentHome from './Student/StudentHome';
import InstructorHome from './Instructor/InstructorHome';
import ModuleDetails from './Instructor/ModuleDetails';
import AssignmentEditor from './Instructor/AssignmentEditor';
import AssignmentSetup from './Instructor/AssignmentSetup';
import PeerSubmission from './Student/PeerSubmission';
import PDFView from './Components/PDFView';
import Upload from './Components/Upload';
import FeedbackReview from './Components/FeedbackReview';
import CommentsDisplay from './Components/CommentsDisplay';
import {PrivateRoute} from './routes.js';

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
		<Route path='/instructors/:username/modules/:moduleId/assignments/:assignmentId' component={AssignmentEditor} />
		<Route path='/instructors/:username/modules/:moduleId/assignmentsetup' component={AssignmentSetup} />
		<Route path='/instructors/:username/modules/:moduleId' component={ModuleDetails} />
		<PrivateRoute path='/instructors/:username' component={InstructorHome} />
		<PrivateRoute path='/students/:username' component={StudentHome} />
		<Route exact path="/" render={() => (<Redirect to="/login" />)} />
		</Switch>
		</div>
		</Router>
	);
}
