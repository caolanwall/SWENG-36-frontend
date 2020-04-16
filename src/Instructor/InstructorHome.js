import React from 'react';
import axios from 'axios';
import InfoTable from './../Components/InfoTable';
import {LogoutButton} from '../Components/Authentification'
import {Link} from "react-router-dom"

class InstructorHome extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username,
			id: this.props.location.state.id,
			modules: [],
			assignments: [],
			studentsPerModule: []
		};
	}

	componentDidMount() {
		//Get the user by Id
		axios.get('http://localhost:3001/user?id=' + this.state.id)
			.then( postres => {
				const user = postres.data.data[0]
				this.setState({ modules: user.modules})
				//GET all assignments for all modules
				this.state.modules.forEach( module => {
					// Get all assignments for this module
					axios.get("http://localhost:3001/assignment?module=" + module,
						{headers : {'crossDomain' : true,
							'Content-type' : 'application/json'}})
						.then( res => {
							console.log("Getting assignments for", module, res)
							if(res.data.data != null){
								const as = this.state.assignments
								as.push(...res.data.data)
								this.setState({ assignments: as	})
							}
						}
						)

					// Get all students that take this module
					axios.get("http://localhost:3001/user?module=" + module,
						{headers : {'crossDomain' : true,
							'Content-type' : 'application/json'}})
						.then( res => {
							console.log("Getting students for", module, res)
							if(res.data.data != null){
								const index = this.state.modules.indexOf(module)
								const spm = this.state.studentsPerModule
								spm[index] = res.data.data
								if(!spm[index]) spm[index] = 0
								this.setState({
									studentsPerModule: spm	})
							}
						}
						)

				})
			})
	}

	render() {
		return (
			<div className="InstructorHome" align="center">
			<NavigationBar modules={this.state.modules}/>
			<header className="App-header">
			<h2>
			Welcome Home, Instructor {this.state.username}
			</h2>
			</header>
			<DataTable assignments={this.state.assignments}
				studentsPerModule={this.state.studentsPerModule}/>
			</div>
		);
	}
}

const AddModule = () => (
	<Link to={location => ({
		pathname: location.pathname + "/addmodule",
		state: { username: location.state.username,
				id: location.state.id }
	})} >
		<button>Add Module</button>
	</Link>
)

const AddAssignment = (props) => (
	<Link to={location => ({
		pathname: location.pathname + '/addassignment',
		state: { username: location.state.username,
				id: location.state.id,
				modules: props.modules
		}
	})} >
	<button>Add Assignment</button>
	</Link>
)

const NavigationBar = (props) => (
	<div>
	<LogoutButton />
	<AddModule />
	<AddAssignment modules={props.modules}/>
	</div>
)

function parseData(props){
	console.log("Parsing", props.assignments)
	return props.assignments.map(a => {
		// Calculate current stage
		const now = Date.now()
		const dates = [
			{ date: Date.parse(a.final_End), value: "Final Ended" },
			{ date: Date.parse(a.final_Start), value: "Final" },
			{ date: Date.parse(a.review_End), value: "Review Ended" },
			{ date: Date.parse(a.review_Start), value: "Review" },
			{ date: Date.parse(a.draft_End), value: "Draft Ended" },
			{ date: Date.parse(a.draft_Start), value: "Draft" },
			{ date: now, value: "Not Started" }
		]

		let currentStage, nextStage
		for(let i = 0; i < dates.length; i++){
			const found = dates[i]
			if(now >= found.date){
				currentStage = found
				if(i > 0)
					nextStage = dates[i-1]
				else
					nextStage = { date: "Never", value: "Done" }
				break
			}
		}

		const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }

		return {
		key: a._id,
		title: a.title,
		module_Code: a.module_Code,
		description: a.description,
		students: props.studentsPerModule[
			props.assignments.indexOf(a)].length,
		stage: currentStage.value,
		stage_End: new Date(nextStage.date).toLocaleTimeString('en-IE', options)
		}
	})
}

function DataTable(props){
	const columns = React.useMemo(
		() => [
			{
				Header: 'Assignments',
				columns: [
					{
						Header: 'Title',
						accessor: 'title',
					},
					{
						Header: 'Module',
						accessor: 'module_Code',
					},
					{
						Header: 'Description',
						accessor: 'description',
					},
					{
						Header: 'Students',
						accessor: 'students',
					},
					{
						Header: 'Stage',
						accessor: 'stage',
					},
					{
						Header: 'Stage End',
						accessor: 'stage_End',
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(() => parseData(props), [props])

	return <InfoTable columns={columns} data={data} routeTo={routeToAssignment}/>;
}

function routeToAssignment(history, location, index, cells) {
	history.push({pathname: location.pathname+'/modules/' + index, state: {username: location.state.username, moduleId: index, moduleName: cells[0].value}});
}

export default InstructorHome;
