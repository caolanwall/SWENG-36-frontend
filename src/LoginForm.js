import React, { Component } from 'react';
import {
  Route,
  Redirect,
  Link
} from "react-router-dom";

import axios from 'axios';
import {fakeAuth} from './Authentification';
import HomeScreen from './HomeScreen';

function LoginWrapper() {
	return (<div align="center">
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
		this.state = {username: '', password: '', redirectToReferrer: false};

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
	
	doLogin = () => {
        fakeAuth.authenticate(() => {
            this.setState({
                redirectToReferrer: true
            })
        })
  	}

	handleSubmit(event) {
		this.doLogin();
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
		const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to="/home" />
        }
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
