import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { Form, Field } from 'react-final-form'
import {LogoutButton} from '../Components/Authentification'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns';

import Styles from '../Components/FormStyle'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
	await sleep(300)
	console.log("Submit", values)
	window.alert(JSON.stringify(values, 0, 2))
	//TODO send POST request to add assignment to backend, and reroute to assignment page
}

const AssignmentSetup = (props) => {

	const [username, setUsername] = useState(props.location.state.username)
	const [id, setId] = useState(props.location.state.id)
	const [modules, setModules] = useState(props.location.state.modules)

	console.log("MODULES", modules)

	return (
		<div className="AssignmentSetup" align="center">
		<NavigationBar />
		<SetupForm modules={modules}/>
		</div>
	);
}
const NavigationBar = () => (
	<LogoutButton />

)

const DateRangePickerAdapter = ({input, meta, label, ...rest}) => {
	const [state, setState] = useState({
		  selection1: {
			      startDate: addDays(new Date(), 1),
			      endDate: null,
			      key: 'selection1'
			    },
		  selection2: {
			      startDate: addDays(new Date(), 4),
			      endDate: addDays(new Date(), 8),
			      key: 'selection2'
			    },
		  selection3: {
			      startDate: addDays(new Date(), 8),
			      endDate: addDays(new Date(), 10),
			      key: 'selection3',
			    }
	});

	return (
		<DateRangePicker
		  onChange={item => setState({ ...state, ...item })}
		  ranges={[state.selection1, state.selection2, state.selection3]}
		/>
)
}

const SetupForm = (props) => {
	return (
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
			return {}
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
			<Field name="instructions">
			{({ input, meta }) => (
				<div>
				<label>Instructions</label>
				<input {...input} type="file" accept=".pdf" placeholder="Document" />
				{meta.error && meta.touched && <span>{meta.error}</span>}
				</div>
			)}
			</Field>
			<Field name="draftDates" component={DateRangePickerAdapter}/>
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
