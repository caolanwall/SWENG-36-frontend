import React, {useEffect, useState, setState} from 'react'
import { Form, Field } from 'react-final-form'
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Styles from '../Components/FormStyle'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const ModuleSetupForm = (props) => {

	const [students, setStudents] = useState([])
	const [instructors, setInstructors] = useState([])

	useEffect(() => {
		async function fetchData() {
		const instructors = await axios.get('http://localhost:3001/user?role=instructor')
		const students = await axios.get('http://localhost:3001/user?role=student')
		setStudents(students.data.data)
		setInstructors(instructors.data.data)
		}
		fetchData();
	}, []);

	return (
	<Styles>
	<h1>Create New Module</h1>
	<Form
	onSubmit= {async values => {
	await sleep(300)
	const moduleCode = values.moduleCode
	const instructors = values.instructors
	const students = values.students
	const data = { moduleCode: moduleCode,
		instructors: instructors,
		students: students }
		console.log("Submit", values)

	//TODO send POST to add module to instructors & students
	}}

	validate={values => {
		const errors = {}
		if (!values.moduleCode) {
			errors.moduleCode = 'Required'
		}
		if (!values.instructors) {
			errors.instructors = 'Required'
		}
		if (!values.students) {
			errors.students = 'Required'
		}
		return errors
	}}
	render={({ handleSubmit, form, submitting, pristine, values }) => {
		return (
		<form onSubmit={handleSubmit}>
		<Field name="moduleCode">
		{({ input, meta }) => (
			<div>
			<label>Module Code</label>
			<input {...input} type="text" placeholder="Code" />
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
		)}
		</Field>
		<Field name="instructors" type="select" multiple>
		{({ input, meta }) => {
			return (
			<div>
			<label>Instructors</label>
			<select {...input}>
				{instructors.map( instructor => (
					<option value={instructor.name} key={instructor._id}>
						{instructor.name}
					</option>
					)
				)}
			</select>
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
			)}}
		</Field>
		<Field name="students" type="select" multiple>
		{({ input, meta }) => {
			return (
			<div>
			<label>Students</label>
			<select {...input}>
				{students.map( student => (
					<option value={student.name} key={student._id}>
						{student.name}
					</option>
					)
				)}
			</select>
			{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
			)}}
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

export default ModuleSetupForm
