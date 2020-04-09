import React from 'react'
import { Form, Field } from 'react-final-form'
import Styles from './FormStyle'
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {authHandler} from './Authentification';
const bcrypt = require("bcryptjs")

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const LoginForm = (props) => {
	const history = useHistory()

	return (
	<Styles>
	<h1>reView</h1>
	<Form
	onSubmit= {async (values, form, callback) => {
	await sleep(300)
	const username = values.username
	const role = values.role
	const data = {username: username, role: role}
	axios.post("http://localhost:3001/auth", data)
		.then(result => {
			console.log("Result:", result)
			if(result.data.success){
				// check password hash
				bcrypt.compare(values.password, result.data.hash)
					.then((res) => {
						if(res){
							console.log("Correct password")
							authHandler.authenticate(role, username)
							history.push({
									pathname: '/' + role + 's/' + username,
									state: {username: username,
											id: result.data.id
										}
							})
						} else alert("incorrect password")
					}
					)
			} else alert("couldn't find user/password/role!")
		}).catch(err => console.log(err))
}}

	validate={values => {
		const errors = {}
		if (!values.username) {
			errors.username = 'Required'
		}
		if (!values.password) {
			errors.password = 'Required'
		}
		if (!values.role) {
			console.log("Validating role", values)
			errors.role = 'Required'
		}
		return errors
	}}
	render={({ handleSubmit, form, submitting, pristine, values }) => {
		return (
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
		<Field name="role" defaultValue="student">
		{({ input, meta }) => (
			<div>
			<label>Role</label>
			<select {...input}>
				<option value="student">Student</option>
				<option value="instructor" selected>Instructor</option>
			</select>
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
	)}}
	/>
	</Styles>)
}
export default LoginForm;
