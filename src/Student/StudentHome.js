import React from 'react';
import axios from 'axios';
import InfoTable, {makeData, getRandomDate} from '../Components/InfoTable';
import {LogoutButton} from '../Components/Authentification'

class StudentHome extends React.Component {

	constructor(props) {
		super(props);
		console.log("Constructor", this.props)
		this.state = {
			username : this.props.location.state.username,
			id: this.props.location.state.id,
			assignments : []
		};
	}

	//TODO Because of the way the data is stored, we want to get modules from user, then all assignments for each of those modules, and display them in table

	componentDidMount() {
		const url = 'http://localhost:3001/user?id=' + this.state.id;
		axios.get(url, {headers : {'crossDomain' : true, 'Content-type' : 'application/json'}})
			.then(res => {
				this.setState({	assignments : res.data.data[0].assignments})
			}
			)
			.catch(err => console.log(err)
			);
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
	return props.assignments.map(name => {
			return {name: name}
		})
}

function DataTable(props){
	const columns = React.useMemo(
		() => [
			{
				Header: 'Assignments',
				accessor: 'name'
			},
		],
		[]
	)

	const data = React.useMemo(
		() => parseData({assignments: props.assignments}), [props])

	return <InfoTable columns={columns} data={data} routeTo={routeToAssignment}/>;
}

function routeToAssignment(history, location, index, cells) {
	//TODO route correctly depending on the assignment stage
	history.push({pathname: location.pathname + '/' + index, state: {moduleName: cells[0].value, assignmentName: cells[1].value, stage: cells[2].value, dueDate: cells[3].value}});
}

export default StudentHome;
