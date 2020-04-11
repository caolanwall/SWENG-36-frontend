import React from 'react';
import axios from 'axios';
import InfoTable  from '../Components/InfoTable';
import {LogoutButton} from '../Components/Authentification'

class StudentHome extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username,
			id: this.props.location.state.id,
			modules: this.props.location.state.modules,
			assignments : []
		};
	}

	componentDidMount() {
		//Get the user by Id
		axios.get('http://localhost:3001/user?id=' + this.state.id)
			.then( postres => {
				console.log("postes", postres)
				const user = postres.data.data[0]
				this.setState({ modules: user.modules})
				//GET all assignments for all modules taken by student
				this.state.modules.forEach( module => {
					const url = "http://localhost:3001/assignment?module=" + module
					axios.get(url,
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
				})
			})
	}

	render() {

		return (
			<div className="Home" align="center">
			<NavigationBar />
			<header className="App-header">
			<h2>
			Welcome, Student {this.state.username}
			</h2>
			</header>
			<DataTable assignments={this.state.assignments}/>
			</div>
		);
	}

}

const NavigationBar = () => (
	<LogoutButton />
)

function parseData(props){
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

	const data = React.useMemo(() => parseData({assignments: props.assignments}), [props])

	return <InfoTable columns={columns} data={data} routeTo={routeToAssignment}/>;
}

function routeToAssignment(history, location, index, cells) {
	//TODO route correctly depending on the assignment stage
	history.push({pathname: location.pathname + '/' + index, state: {moduleName: cells[0].value, assignmentName: cells[1].value, stage: cells[2].value, dueDate: cells[3].value}});
}

export default StudentHome;
