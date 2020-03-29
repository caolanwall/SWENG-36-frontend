import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default wrapper;

function wrapper() {
    return (<div align="center">
        <Title />
        <PDFLinks/>
        <PeerSubmission />
    </div>
    );
}

function Title(props) {
    return <h1>Peer Review Submissions</h1>;
}

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
            Submission to be marked
        </Link>
        </div>
    </React.Fragment>
  );
}

const initialState = {
    comments: "",
    grade: "",
    commentsError: "",
    gradeError: ""
};

class PeerSubmission extends React.Component {
    state = initialState;

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {
        let commentsError = "";
        let gradeError = "";
        // let passwordError = "";

        if (!this.state.comments) {
            commentsError = "comments cannot be blank";
        }

        if (!Number(this.state.grade) || this.state.grade > 100){
            gradeError = "invalid grade. Must be 0-100";
        }

        if (gradeError || commentsError) {
            this.setState({ gradeError, commentsError });
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);

            const data = {
                comments: this.state.comments,
                mark: this.state.mark,
            };

            axios.post("http://127.0.0.1/user/", data)
                .then(res => console.log(res))
                .catch(err => console.log(err)
                );
            //	alert("Sent post request!");

        }

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <textarea value={this.state.value}
                        name="comments"
                        placeholder="comments"
                        value={this.state.comments}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.commentsError}
                    </div>
                </div>
                <div>
                    <input
                        name="grade"
                        placeholder="grade"
                        value={this.state.grade}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.gradeError}
                    </div>
                </div>

                <button type="submit">submit</button>
            </form>
        );
    }
}
