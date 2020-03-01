import React, { Component } from 'react';
import axios from 'axios';

function LoginWrapper() {
	return (<div>
		<Title />
		<LoginForm />
		</div>
	);
}

function Title(props) {
	return <h1>reView</h1>;
}

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {username: '', password: ''};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	resetState(){
		this.setState({username: '', password: ''});
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value});
	}
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleReset(event) {
		event.preventDefault();
		this.resetState();
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = {
			username: this.state.username,
			password: this.state.password
		};

		axios.post(
			//TODO Integrate with backend by receiving back approval, then route to home screen
			"http://127.0.0.1/user/", data)
			.then(res => console.log(res))
			.catch(err => console.log(err)
			);
		alert("Sent post request!");
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			<div>
			<div> Username: </div>
			<input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
			</div>
			<div>
			<div> Password: </div>
			<input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
			</div>
			<button onClick={this.handleReset}> Reset </button> {" "}
			<input type="submit" value="Submit"/>
			</form>
		);
	}
}


export default LoginWrapper;
