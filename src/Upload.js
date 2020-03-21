import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {
    state = {
        selectedFile: null
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
        axios.post("http://localhost:8000/upload", data, {
            // receive two parameter endpoint url, form data
        })
            .then(res => { // then print response status
                console.log(res.statusText)
            })
    }


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
