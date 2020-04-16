import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            // username : this.props.location.state.username,
            // assignmentName : this.props.location.state.assignmentName,
            // dueDate : this.props.location.state.dueDate,
        }
    }
    fileSelectHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
       axios.post("http://localhost:3001/uploadPDF", data, {
            // receive two parameter endpoint url, form data
        })
            .then(res => { // then print response status
                console.log(res.statusText)
            })
    }

    //// TODO: Code below export.
    //Need to add back  in regular button and fileUploadHAndler when integrating properly.
    render() {
        return (
            <div className="Upload">
                <input type="file" onChange={this.fileSelectHandler} />
                <button onClick={this.fileUploadHandler}> Upload </button>
            </div>
        );
    }
}


export default Upload;
//<button onClick={this.fileUploadHandler}> Upload </button>
