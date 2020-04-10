import React from 'react';
import axios from 'axios';
import InfoTable, {makeData, getRandomDate} from '../Components/InfoTable';
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
	return props.assignments.map(assignment => {
		let cloned = objectMap(assignment, a => a)
		cloned.key = cloned._id
		return cloned
	})
}

const objectMap = (obj, fn) =>
	  Object.fromEntries(
		      Object.entries(obj).map(
				        ([k, v], i) => [k, fn(v, k, i)]
				      )
		    )



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
						Header: 'Review Count',
						accessor: 'review_Count',
					},
					{
						Header: 'Draft Start',
						accessor: 'draft_Start',
					},
					{
						Header: 'Draft End',
						accessor: 'draft_End',
					},
					//TODO add all other relevant fields
				],
			},
		],
		[]
	)

	console.log("Assignments", props.assignments)
	const data = React.useMemo(() => parseData({assignments: props.assignments}), [props])

	return <InfoTable columns={columns} data={data} routeTo={routeToAssignment}/>;
}

function routeToAssignment(history, location, index, cells) {
	//TODO route correctly depending on the assignment stage
	history.push({pathname: location.pathname + '/' + index, state: {moduleName: cells[0].value, assignmentName: cells[1].value, stage: cells[2].value, dueDate: cells[3].value}});
}

export default StudentHome;
