import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FileDownload = require('js-file-download');

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

//Not working
//All /*axios were different attempts to get a download to work
//
    fileDownloadHandler = () => {
        /*axios.get("http://localhost:5001/files/5e94e85d85e48d58b7af1890")
            .then(res => { // then print response status
                FileDownload(res.data, 'response.pdf');
            })*/
          /*  axios({
        //url: 'http://localhost:5001/files/51579f1c26ee9b424fd0fd857d7dcd19.pdf',
        url: 'https://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data],{type: 'application/pdf'}));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'response.pdf');
        document.body.appendChild(link);
        link.click();
      });*/

            axios({
          url: 'http://localhost:5001/files/51579f1c26ee9b424fd0fd857d7dcd19.pdf',
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
          // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
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

    //Below added fileDownloadHandler to try download file
    render() {
        return (
          <div>
          <div className="Download">
              <button onClick={this.fileDownloadHandler}> Download </button>
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
