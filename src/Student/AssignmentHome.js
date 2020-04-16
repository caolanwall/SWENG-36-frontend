import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {LogoutButton} from '../Components/Authentification'
import PdfStuff from '../Components/PDFView';
import ReviewYourPeers from './PeerSubmission';
import FeedbackReview from '../Components/FeedbackReview';

class AssignmentLandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			moduleName : this.props.location.state.moduleName,
			assignmentName : this.props.location.state.assignmentName,
			dueDate : this.props.location.state.dueDate,
			stage: this.props.location.state.stage
		}
	}

	render() {
		return (
			<div className="main" align='center'>
			<NavigationBar />
			<h2>Assignment {this.state.assignmentName} for module {this.state.moduleName}</h2>
			<h2>Currently at stage {this.state.stage}, due by {this.state.dueDate}</h2>
			</div>
		);
	}

}
const NavigationBar = () => (
	<div>
	<LogoutButton />
	<SubmissionButton />
	<SubmitReviewButton />
	<FeedbackButton />
	</div>
)

const SubmissionButton = () => (
	<Link to="/upload">
	<button>
	Submit Work
	</button>
	</Link>
)

const SubmitReviewButton = () => (
	<Link to="/peersubmission">
	<button>
	Submit Review
	</button>
	</Link>
)
const FeedbackButton = () => (
	<Link to="/FeedbackReview">
	<button>
	Feedback
	</button>
	</Link>
)
export default AssignmentLandingPage;
