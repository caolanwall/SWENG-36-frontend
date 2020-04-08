import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { Form, Field } from 'react-final-form'
import Styles from '../Components/FormStyle'
import {LogoutButton} from '../Components/Authentification'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
	await sleep(300)
	window.alert(JSON.stringify(values, 0, 2))
	//TODO send POST request to add assignment to backend, and reroute to assignment page
}

class AssignmentSetup extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username,
			moduleId: this.props.location.state.moduleId,
			moduleName: this.props.location.state.moduleName,
		};
	}

	render() {
		return (
			<div className="AssignmentSetup" align="center">
			<NavigationBar />
			<header className="App-header">
			<h2>
			</h2>
			</header>
			<SetupForm moduleName={this.state.moduleName}/>
			</div>
		);
	}
}
const NavigationBar = () => (
	<LogoutButton />

)
const SetupForm = (props) => (
	<Styles>
	<h2>Please enter assignment details for {props.moduleName}:</h2>
	<Form
	onSubmit={onSubmit}
	validate={values => {
		const errors = {}
		if (!values.assignmentName) {
			errors.assignmentName = 'Required'
		}
		if (!values.document) {
			errors.document = 'Required'
		}
		else if (!values.document.match(".+.pdf")) {
			errors.document = 'PDF Required';
		}
		if (!values.dueDate) {
			errors.dueDate = 'Required'
		}
		return errors
	}}
	render={({ handleSubmit, form, submitting, pristine, values }) => (
		<form onSubmit={handleSubmit}>
		<Field name="assignmentName">
		{({ input, meta }) => (
			<div>
			<label>Assignment Name</label>
			<input {...input} type="text" placeholder="Title" />
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
		)}
		</Field>
		<Field name="document">
		{({ input, meta }) => (
			<div>
			<label>Instructions</label>
			<input {...input} type="file" accept=".pdf" placeholder="Document" />
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
		)}
		</Field>
		<Field name="dueDate">
		{({ input, meta }) => (
			<div>
			<label>Due Date</label>
			<input {...input} type="date" placeholder="Due Date" />
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


export default AssignmentSetup;
