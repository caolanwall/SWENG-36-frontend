import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'
import Styles from './FormStyle'
import {Route,Redirect,Link} from "react-router-dom";
import axios from 'axios';
import {fakeAuth} from './Authentification';
const bcrypt = require("bcryptjs")

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
	await sleep(300)
	const data = {username: values.username, role: values.role}
	axios.post("http://localhost:3001/validateUsername", data)
	.then(result => console.log(result))
	.catch(err => console.log(err))
	//TODO from result compare hashes and route to home page
}


const LoginForm = (props) => (
	<Styles>
	<h1>reView</h1>
	<Form
	onSubmit={onSubmit}
	validate={values => {
		const errors = {}
		if (!values.username) {
			errors.username = 'Required'
		}
		if (!values.password) {
			errors.password = 'Required'
		}
		if (!values.role) {
			errors.role = 'Required'
		}
		return errors
	}}
	render={({ handleSubmit, form, submitting, pristine, values }) => (
		<form onSubmit={handleSubmit}>
		<Field name="username">
		{({ input, meta }) => (
			<div>
			<label>Username</label>
			<input {...input} type="text" placeholder="Username" />
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
		)}
		</Field>
		<Field name="password">
		{({ input, meta }) => (
			<div>
			<label>Password</label>
			<input {...input} type="password" placeholder="Password" />
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
		)}
		</Field>
		<Field name="role" initialValue="student" value="student" type="radio">
		{({ input, meta }) => (
			<div>
			<label>Role</label>
			<input {...input} id="instructor" />
			<label for="instructor">Instructor</label>
			<input {...input} id="student" />
			<label for="student">Student</label>
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
		)}
		</Field>
		<div className="buttons">
		<button type="submit" disabled={submitting}>
		Submit
		</button>
		<button
		type="button"
		onClick={form.reset}
		disabled={submitting || pristine}
		>
		Reset
		</button>
		</div>
		</form>
	)}
	/>
	</Styles>
)
// ====================================================================================
//function LoginWrapper() {
//	return (<div align="center">
//		<Title />
//		<LoginForm />
//		</div>
//	);
//}
//
//function Title(props) {
//	return <h1>reView</h1>;
//}
//
//class LoginForm extends Component {
//	constructor(props) {
//		super(props);
//		this.state = {username: '', password: '', role: "student", redirectToReferrer: false};
//
//		this.handleUsernameChange = this.handleUsernameChange.bind(this);
//		this.handlePasswordChange = this.handlePasswordChange.bind(this);
//		this.handleOptionChange = this.handleOptionChange.bind(this);
//		this.handleSubmit = this.handleSubmit.bind(this);
//		this.handleReset = this.handleReset.bind(this);
//	}
//
//	resetState(){
//		this.setState({username: '', password: '', role: "student", redirectToReferrer: false});
//	}
//
//	handleUsernameChange(event) {
//		this.setState({
//			username: event.target.value});
//	}
//	handlePasswordChange(event) {
//		this.setState({password: event.target.value});
//	}
//
//	handleOptionChange = changeEvent => {
//		this.setState({
//			role: changeEvent.target.value
//		});
//	};
//
//	handleReset(event) {
//		event.preventDefault();
//		this.resetState();
//	}
//
//	doLogin = (data) => {
//		bcrypt.genSalt(10, function(err, salt) {
//			bcrypt.hash(data.password, salt, function(err, hash) {
//				data.password = hash;
//				axios.post(
//					"http://localhost:3001/auth", data)
//					.then(res => console.log(res))
//					.catch(err => console.log(err)
//					);
//			});
//		});
///*
//		this.setState({redirectToReferrer: true})
//		//TODO actually check with backend if user exists and is allowed to view page
//		fakeAuth.authenticate(() => {
//			this.setState({
//				redirectToReferrer: true
//			})
//		})*/
//	}
//
//	handleSubmit(event) {
//		event.preventDefault();
//		const data = {
//			username: this.state.username,
//			password: this.state.password,
//			role: this.state.role
//		};
//
//		this.doLogin(data);
//	}
//
//	render() {
//		const redirectToReferrer = this.state.redirectToReferrer;
//		const currentLoginType = this.state.role;
//
//		if (redirectToReferrer === true) {
//			if(currentLoginType === "student") {
//				return <Redirect to={{
//					pathname: '/students/'+this.state.username,
//						state: { username: this.state.username }
//				}} />
//			} else if (currentLoginType === "instructor") {
//				return <Redirect to={{
//					pathname: "/instructors/"+this.state.username,
//						state: { username: this.state.username }
//				}} />
//			}
//		}
//		return (
//			<form onSubmit={this.handleSubmit}>
//			<div>
//			<div> Username: </div>
//			<input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
//			</div>
//			<div>
//			<div> Password: </div>
//			<input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
//			</div>
//
//			<div className="form-check">
//			<label>
//			<input
//			type="radio"
//			name="role"
//			value="student"
//			checked={this.state.role === "student"}
//			onChange={this.handleOptionChange}
//			className="form-check-input"
//			/>
//			Student
//			</label>
//			</div>
//
//			<div className="form-check">
//			<label>
//			<input
//			type="radio"
//			name="role"
//			value="instructor"
//			checked={this.state.role === "instructor"}
//			onChange={this.handleOptionChange}
//			className="form-check-input"
//			/>
//			Instructor
//			</label>
//			</div>
//			<button onClick={this.handleReset}> Reset </button> {" "}
//			<input type="submit" value="Submit"/>
//			</form>
//		);
//	}
//}
//
export default LoginForm;
