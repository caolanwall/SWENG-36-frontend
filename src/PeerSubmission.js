import React from 'react';
import './App.css';
import axios from 'axios';

export default wrapper;

function wrapper(){
	return(<div align="center">
        <Title />
        <PeerSubmission/>
		</div>
	);
}

function Title(props) {
	return <h1>Peer Review Submissions</h1>;
}

class PeerSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Enter Text Here'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}



