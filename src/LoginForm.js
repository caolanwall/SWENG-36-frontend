import React, { Component } from 'react';
import {
	Route,
	Redirect,
	Link
} from "react-router-dom";

import axios from 'axios';
import {fakeAuth} from './Authentification';

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
		this.state = {username: '', password: '', loginType: "student", redirectToReferrer: false};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	resetState(){
		this.setState({username: '', password: '', loginType: "student", redirectToReferrer: false});
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value});
	}
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}
	
	handleOptionChange = changeEvent => {
		this.setState({
			loginType: changeEvent.target.value
		  });
	};

	handleReset(event) {
		event.preventDefault();
		this.resetState();
	}

	doLogin = () => {
			this.setState({redirectToReferrer: true})
		//TODO actually check with backend if user exists and is allowed to view page
		fakeAuth.authenticate(() => {
			this.setState({
				redirectToReferrer: true
			})
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		this.doLogin();
		const data = {
			username: this.state.username,
			password: this.state.password, //TODO make this a hash
			loginType: this.state.loginType
		};

		axios.post(
			//TODO Integrate with backend by receiving back approval, then route to home screen
			"http://127.0.0.1/user/", data)
			.then(res => console.log(res))
			.catch(err => console.log(err)
			);
	//	alert("Sent post request!");

	}

	render() {
		const redirectToReferrer = this.state.redirectToReferrer;
		const currentLoginType = this.state.loginType;

		if (redirectToReferrer === true) {
			if(currentLoginType === "student") {
				return <Redirect to={{
							pathname: '/students/'+this.state.username,
							state: { username: this.state.username }
						}} />
			} else if (currentLoginType === "instructor") {
				return <Redirect to={{
							pathname: "/instructors/"+this.state.username,
							state: { username: this.state.username }
						}} />
			}
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

			<div className="form-check">
			<label>
			<input
			type="radio"
			name="loginType"
			value="student"
			checked={this.state.loginType === "student"}
			onChange={this.handleOptionChange}
			className="form-check-input"
			/>
			Student 
			</label>
			</div>

			<div className="form-check">
			<label>
			<input
			type="radio"
			name="loginType"
			value="instructor"
			checked={this.state.loginType === "instructor"}
			onChange={this.handleOptionChange}
			className="form-check-input"
			/>
			Instructor 
			</label>
			</div>
			<button onClick={this.handleReset}> Reset </button> {" "}
			<input type="submit" value="Submit"/>
			</form>
		);
	}
}

export default LoginWrapper;
