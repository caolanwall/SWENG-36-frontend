import React, { Component } from 'react';
import CommentsDisplay from './CommentsDisplay';
import { withRouter, Redirect, Link, Route, Switch } from "react-router-dom";

function PDFLinks(){
  return(
    <React.Fragment>
    <div>
        <Link to={{
            pathname:"/pdfView",
            docName:"/AssignmentRubric.pdf"

        }}>
            Marking Rubric
        </Link>
        </div>
        <div>
        <Link to={{
            pathname:"/pdfView",
            docName:"/CompMathsAss1V3.pdf"
        }}>
            My Submission
        </Link>
        </div>
    </React.Fragment>
  );
}

class FeedbackReview extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            students: [
                { id: 1, age: 78, email: <li><Link to="/feedback/comments">Comments</Link></li> },
                { id: 2, age: 60, email: <li><Link to="/feedback/comments">Comments</Link></li> },
                { id: 3, age: 88, email: <li><Link to="/feedback/comments">Comments</Link></li> },
            ]
        }
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const { id, name, age, email } = student //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{age}</td>
                    <td>{email}</td>
                </tr>
            )
        })
    }

    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <h1 id='title'>React Dynamic Table</h1>
                <PDFLinks/>
                <table id='students'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>

            </div>
        )
    }
}
export default FeedbackReview
