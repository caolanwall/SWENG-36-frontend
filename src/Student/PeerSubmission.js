import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {LogoutButton} from '../Components/Authentification'

const FileDownload = require('js-file-download');

export default wrapper;

function wrapper() {
    return (<div align="center">
		<NavigationBar />
        <Title />
        <PDFLinks/>
        <PeerSubmission />
    </div>
    );
}

const NavigationBar = () => (
	<LogoutButton />
)

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
        {/*}<Link to={{
            pathname:"/pdfView",
            docName:"/CompMathsAss1V3.pdf"

        }}>
            Submission to be marked
        </Link>*/}
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

            axios.post("http://localhost:3001/submission", data)
                .then(res => console.log(res))
                .catch(err => console.log(err)
                );
            //	alert("Sent post request!");

        }

    };

//Downloads a file from the backend
//TODO: need to get filename of pdf file from backend - currently hardcoded.
    fileDownloadHandler = (fileDownloadURL) => {
      axios({
        //Below url needs to not be hardcoded in - also must be filename not id
        //  url: 'http://localhost:3001/files/928b8649787e3c29357c095fa43e9348.pdf',
          url: fileDownloadURL,
          method: 'GET',
          responseType: 'blob' //Force to receive data in a Blob Format
      })
      .then(response => {
      //Create a Blob from the PDF Stream
          const file = new Blob(
            [response.data],
            {type: 'application/pdf'});
      //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          console.log(fileURL);
          //Open the URL on new Window
          //window.open(fileURL);
          const link = document.createElement('a');
          link.href = fileURL;
          link.setAttribute('download', file);

          //Possible error below when using a MacBook.
          if (typeof link.download === 'undefined') {
            link.setAttribute('target', '_blank');
        }
          document.body.appendChild(link);
          link.click();
      })
      .catch(error => {
          console.log(error);
      });
    }

    render() {
        return (
          <div>
          <div >
          {/*Button will download that file from backend. Currently hardcoded.*/}
              <button onClick={this.fileDownloadHandler('http://localhost:3001/files/928b8649787e3c29357c095fa43e9348.pdf')}> Submission to be Marked  </button>
          </div>
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
            </div>
        );
    }
}
