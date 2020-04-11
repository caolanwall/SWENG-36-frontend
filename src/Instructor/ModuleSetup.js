import React, {useEffect, useState, setState} from 'react'
import { Form, Field } from 'react-final-form'
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Styles from '../Components/FormStyle'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const ModuleSetupForm = (props) => {


	const [students, setStudents] = useState([])
	const [instructors, setInstructors] = useState([])
	const [username, setUsername] = useState(props.location.state.username)
	const [id, setId] = useState(props.location.state.id)

	const history = useHistory()

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
			console.log("Submit", values)

			//Add module code to all instructors that don't already have it
			values.instructors.map(name =>
				instructors.find(i => i.name === name))
					.filter(i => !i.modules.includes(moduleCode))
				.forEach(instructor => {
					console.log("Sending patch", moduleCode, instructor)
					const url = 'http://localhost:3001/userModule?id=' +
						instructor._id + '&module=' + moduleCode
					axios.patch(url)
				})

			//Add module code to all students that don't already have it
			values.students.map(name =>
				students.find(i => i.name === name))
					.filter(i => !i.modules.includes(moduleCode))
				.forEach(student => {
					console.log("Sending patch", moduleCode, student)
					const url = 'http://localhost:3001/userModule?id=' +
						student._id + '&module=' + moduleCode
					axios.patch(url)
				})

			//Done, redirect back
			history.push({ pathname: '/instructors/' + username,
				state: { username: username, id: id } } );
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
