import React, { Component } from 'react';
import { useTable } from 'react-table';
import CommentsDisplay from './CommentsDisplay';
import { withRouter, Redirect, Link, Route, Switch } from "react-router-dom";
import AssignmentLandingPgrade from './../Student/AssignmentHome';

function PDFLinks() {
    return (
        <React.Fragment>
            <div>
                <Link to={{
                    pathname: "/pdfView",
                    docName: "/rubric.pdf"

                }}>
                    Marking Rubric
        </Link>
            </div>
            <div>
                <Link to={{
                    pathname: "/pdfView",
                    docName: "/upload.pdf"
                }}>
                    My Submission
        </Link>
            </div>
        </React.Fragment>
    );
}

class FeedbackReview extends React.Component {
    constructor(props) {
        super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            feedback: [
                { id: "", grade: "Grade", comments: "Their Feedback" },
                { id: 1, grade: 78, comments: <Link to="/feedback/comments">Read the Comments</Link> },
                { id: 2, grade: 60, comments: <Link to="/feedback/comments">Read the Comments</Link> },
                { id: 3, grade: 88, comments: <Link to="/feedback/comments">Read the Comments</Link> },
            ]
        }
    }

    renderTableData() {
        return this.state.feedback.map((feedback, index) => {
            const { id, grade, comments } = feedback //destructuring
            return (
                <tr key={id}>
                    <span> <td>{id}</td> </span>
                    <span> <td>{grade}</td> </span>
                    <span> <td>{comments}</td> </span>
                </tr>
            )
        })
    }

    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <h1 id='title'>Feedback Given to You</h1>
                <PDFLinks />
                <table id='feedback'>
                    <tbody>

                        <span>  {this.renderTableData()}</span>
                    </tbody>
                </table>

            </div>
        )
    }
}
export default FeedbackReview
