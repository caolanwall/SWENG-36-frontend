import React, {useMemo} from 'react';
import axios from 'axios';
import InfoTable, {range, makeData} from './InfoTable';
import {Link} from "react-router-dom";
const isLoggedIn = true;

class StudentHome extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username, 	// passed on from the login screen 
			modules : [] 						// Array of module container classes 
		};
	}

	componentDidMount() {
		let url = '127.0.0.1:8001/users/' + this.username + '/modules';
		axios.get(url, {headers : {'crossDomain' : true, 'Content-type' : 'application/json'}})
			.then(res => {
				this.setState({modules : res.data})
			})
			.catch(err => console.log(err)
			);
	}

	render() {

		return (
			<div className="Home">
			<Link to="/login">
     			<button type="button" onClick={() => alert('Logging out!')}> Log out </button>
 			</Link>
			<header className="App-header">
			<h2>
			Welcome, Student {this.state.username}	
			</h2>
			</header>
			<DataTable />
			</div>
		);
	}

}
function	parseData(){
	//TODO actually parse JSON module data
	return makeData(newModule, 20);
}

function DataTable(){
	const columns = React.useMemo(
		() => [
			{
				Header: 'Modules',
				columns: [
					{
						Header: 'Name',
						accessor: 'name',
					},
					{
						Header: 'Title',
						accessor: 'title',
					},
					{
						Header: 'Stage',
						accessor: 'stage',
					},
					{
						Header: 'Date Due',
						accessor: 'dateDue',
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(() => parseData(), [])

	return <InfoTable columns={columns} data={data} routeTo={routeToAssignment}/>;
}
const newModule = () => {
	return {
		name: "Computing I",
		title: "Matrix Multiplication", 
		stage: "Not started",
		dateDue: "13/08/2020", 
	}
}

function routeToAssignment(history, location, index, cells) {
	//TODO route correctly depending on the assignment stage
	alert(index);
	history.push({pathname: location.pathname + '/' + index, state: {moduleName: cells[0].value, assignmentName: cells[1].value, stage: cells[2].value, dueDate: cells[3].value}});
}

export default StudentHome;
