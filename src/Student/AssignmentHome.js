import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Redirect, Link, Route} from "react-router-dom";

import PdfStuff from './../Components/PDFView';
import ReviewYourPeers from './PeerSubmission';
import FeedbackReview from './../Components/FeedbackReview';

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
                <h4>Hello!</h4>
                <h3>This is the landing page for your assignment '{this.state.assignmentName}' of module '{this.state.moduleName}'</h3>
                <h2>It is currently at stage '{this.state.stage}', and the next stage is due '{this.state.dueDate}'</h2>
                <li><Link to="/upload">Upload your answer!</Link></li>
                <li><Link to="/peersubmission">Submit Your Peer Reviews</Link></li>
                <li><Link to="/FeedbackReview">Your Received Feedback</Link></li>
            </div>
        );
    }

}
export default AssignmentLandingPage;
