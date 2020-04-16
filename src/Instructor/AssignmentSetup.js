import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from "react-router-dom";
import { Form, Field } from 'react-final-form'
import {LogoutButton} from '../Components/Authentification'

import Styles from '../Components/FormStyle'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const AssignmentSetup = (props) => {

	const [username, setUsername] = useState(props.location.state.username)
	const [id, setId] = useState(props.location.state.id)
	const [modules, setModules] = useState(props.location.state.modules)

	return (
		<div className="AssignmentSetup" align="center">
		<NavigationBar />
		<SetupForm username={username} id={id} modules={modules}/>
		</div>
	);
}
const NavigationBar = () => (
	<LogoutButton />
)

const SetupForm = (props) => {
	const history = useHistory()

	return (
		<Styles>
		<h2>Please enter assignment details for {props.moduleName}:</h2>
		<Form
		onSubmit={
			async values => {
				await sleep(300)
				console.log("Submit", values)
				axios.post("http://localhost:3001/assignment", values)
				history.push({ pathname: '/instructors/' + props.username,
					state: { username: props.username, id: props.id } } );
			}
		}
		validate={values => {
			const errors = {}
			if (!values.title) {
				errors.title = 'Required'
			}
			if (!values.description) {
				errors.description = 'Required'
			}
			if(!values.module_Code) {
				errors.module_Code = 'Required'
			}
			if (!values.marking_Scheme){
				errors.marking_Scheme = 'Required'
			}
			else if (!values.marking_Scheme.match(".+.pdf")) {
				errors.marking_Scheme = 'PDF Required'
			}
			if (!values.draft_Start) errors.draft_Start = 'Required'
			else if(Date.parse(values.draft_Start) < Date.now()) errors.draft_Start = 'Too early'
			if (!values.draft_End) errors.draft_End = 'Required'
			else if(Date.parse(values.draft_End) < Date.parse(values.draft_Start)) errors.draft_End = 'Too early'
			if (!values.review_Start) errors.review_Start = 'Required'
			else if(Date.parse(values.review_Start) < Date.parse(values.draft_End)) errors.review_Start = 'Too early'
			if (!values.review_End) errors.review_End = 'Required'
			else if(Date.parse(values.review_End) < Date.parse(values.review_Start)) errors.review_End = 'Too early'
			if (!values.final_Start) errors.final_Start = 'Required'
			else if(Date.parse(values.final_Start) < Date.parse(values.review_End)) errors.final_Start = 'Too early'
			if (!values.final_End) errors.final_End = 'Required'
			else if(Date.parse(values.final_End) < Date.parse(values.final_Start)) errors.final_End = 'Too early'
			return errors
		}}
		render={({ handleSubmit, form, submitting, pristine, values }) => (
			<form onSubmit={handleSubmit}>
			<Field name="title">
			{({ input, meta }) => (
				<div>
				<label>Title</label>
				<input {...input} type="text" placeholder="Title" />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="description">
			{({ input, meta }) => (
				<div>
				<label>Description</label>
				<input {...input} type="text" placeholder="Description" />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="module_Code" type="select">
			{({ input, meta }) => (
				<div>
				<label>Module</label>
				<select {...input}>
				{props.modules.map( module => (
					<option value={module}>
					{module}
					</option>
				)
				)}
				</select>
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="marking_Scheme">
			{({ input, meta }) => (
				<div>
				<label>Markscheme</label>
				<input {...input} type="file" accept=".pdf" placeholder="Document" />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="draft_Start" type="date">
			{({ input, meta }) => (
				<div>
				<label>Draft Start</label>
				<input {...input}  />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="draft_End" type="date">
			{({ input, meta }) => (
				<div>
				<label>Draft End</label>
				<input {...input}  />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="review_Start" type="date">
			{({ input, meta }) => (
				<div>
				<label>Review Start</label>
				<input {...input}  />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="review_End" type="date">
			{({ input, meta }) => (
				<div>
				<label>Review End</label>
				<input {...input}  />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="final_Start" type="date">
			{({ input, meta }) => (
				<div>
				<label>Final Start</label>
				<input {...input}  />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="final_End" type="date">
			{({ input, meta }) => (
				<div>
				<label>Final End</label>
				<input {...input}  />
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
}


export default AssignmentSetup;
