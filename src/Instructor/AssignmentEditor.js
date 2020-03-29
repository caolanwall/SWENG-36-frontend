import React from 'react';
import axios from 'axios';
import InfoTable, {range, makeData, getRandomDate} from './../Components/InfoTable';
import {Link} from "react-router-dom";

const isLoggedIn = true;

class AssignmentEditor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username, 	
			moduleId: this.props.location.state.moduleId,
			moduleName: this.props.location.state.moduleName,
			assignmentId: this.props.location.state.assignmentId,
			submissions : [] 
		};
	}

	componentDidMount() {
		let url = 'localhost:3000/instructors/' + this.username + '/modules/' + this.moduleId + '/assignments/' + this.assignmentId;
		axios.get(url, {headers : {'crossDomain' : true, 'Content-type' : 'application/json'}})
			.then(res => {
				this.setState({modules : res.data})
			})
			.catch(err => console.log(err)
			);
	}

	render() {
		return (
			<div className="AssignmentEditor">
			<Link to="/login">
			<button type="button" onClick={() => alert('Logging out!')}> Log out </button>
			</Link>
			<header className="App-header">
			<h2>
			Assignments Editor for {this.state.moduleName}
			</h2>
			</header>
			<DataTable />
			</div>
		);
	}
}


function parseData(){
	//TODO actually parse JSON module data
	return makeData(newModule, Math.random() * 20 + 1);
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
						Header: 'Average',
						accessor: 'average',
					},
					{
						Header: 'Submitted',
						accessor: 'submitted',
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

	return <InfoTable columns={columns} data={data} routeTo={routeToModule}/>;
}

const newModule = () => {
	const names = ["Mathematics", "Introduction to Programming", "Programming Project I", "Introduction to Computing I", "Introduction to Computing II", "Electrotechonology", "Digital Logic Design", "Telecommunications I", "Computers and Society", "Algorithms and Data Structures", "Systems Programming I", "Computer Architecture I", "Information Management I", "Concurrent Systems", "Operating Systems", "Microprocessor Systems", "Telecommunications II", "Discrete Mathematics"];
	const titles = ["Simple adding", "Matrix multiplication", "Full adder", "Graphs", "Threads", "Presentation", "Report", "Validation", "Memory", "Processor", "Input Output", "Interrupts", "Polling", "Sets", "Frogs", "Bit Fields", "Printing", "Graphics", "Calculator", "Queries", "Resistors", "Multiplexing"];
	const stages = ["Not Started", "First Submission", "Peer Review", "Final Submission", "Complete"];

	return {
		name: names[Math.floor(Math.random() * names.length)],
		title: titles[Math.floor(Math.random() * titles.length)], 
		stage: stages[Math.floor(Math.random() * stages.length)],
		average: parseFloat(Math.random() * 100).toFixed(2) + '%',
		submitted: parseFloat(Math.random() * 100).toFixed(2) + '%',
		dateDue: getRandomDate(new Date("2020-03-17"), new Date("2020-04-15")).toLocaleDateString(), 

	}
}

function routeToModule(history, location, index, cells) {
	//TODO route correctly depending on the assignment stage
	history.push({pathname: location.pathname+'/modules/' + index, state: {moduleName: cells[0].value}});
}

export default AssignmentEditor;
