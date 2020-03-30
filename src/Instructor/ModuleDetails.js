import React from 'react';
import axios from 'axios';
import InfoTable, {range, makeData, getRandomDate} from './../Components/InfoTable';
import {Link, useHistory, useLocation} from "react-router-dom";

const isLoggedIn = true;

class ModuleDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username,
			moduleId : this.props.location.state.moduleId,
			moduleName: this.props.location.state.moduleName
		};
	}

	componentDidMount() {
		let url = 'localhost:3000/instructors/' + this.username + '/modules/' + this.moduleId;
		axios.get(url, {headers : {'crossDomain' : true, 'Content-type' : 'application/json'}})
			.then(res => {
				this.setState({modules : res.data})
			})
			.catch(err => console.log(err)
			);

	}


	render() {
		return (
			<div className="InstructorHome">
			<Link to="/login">
			<button type="button" onClick={() => alert('Logging out!')}> Log out </button>
			</Link>
			<header className="App-header">
			<h2>
			Module: {this.state.moduleName}
			</h2>
			</header>
			<AssignmentButton moduleId={this.moduleId} moduleName={this.moduleName}/>
			<DataTable />
			</div>
		);
	}
}

function AssignmentButton(props){
	const history = useHistory();
	const location = useLocation();

	return (
		<button onClick={() => {
		const newAssId = parseInt(Math.random() * 50);
		const newAssName = "TEST_NAME";
		//TODO get assignment name and id from user before redirecting
		history.push({pathname: location.pathname+'/assignments/' + newAssId, state: {moduleId: location.state.moduleId, moduleName: location.state.moduleName, assignmentId: newAssId, assignmentName: newAssName}});
		}
		}>
			Add Assignment
			</button>
	);
}

function parseData(){
	//TODO actually parse JSON module data
	return makeData(newAssignment, Math.random() * 25 + 1);
}

function DataTable(){
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
						Header: 'Instructions',
						accessor: 'instructions',
					},
					{
						Header: 'Stage',
						accessor: 'stage',
					},
					{
						Header: 'Due Date',
						accessor: 'dueDate',
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(() => parseData(), [])

	return <InfoTable columns={columns} data={data} routeTo={routeToAssignment}/>;
}
const newAssignment = () => {

	const titles = ["Simple adding", "Matrix multiplication", "Full adder", "Graphs", "Threads", "Presentation", "Report", "Validation", "Memory", "Processor", "Input Output", "Interrupts", "Polling", "Sets", "Frogs", "Bit Fields", "Printing", "Graphics", "Calculator", "Queries", "Resistors", "Multiplexing"];
	const stages = ["Not Started", "First Submission", "Peer Review", "Final Submission", "Complete"];

	return {
		number: parseInt(Math.random() * 50),
		title: titles[Math.floor(Math.random() * titles.length)],
		instructions: "assignment" + parseInt(Math.random() * 18 + 1) + ".pdf",
		stage: stages[Math.floor(Math.random() * stages.length)],
		dueDate: getRandomDate(new Date("2020-03-17"), new Date("2020-04-15")).toLocaleDateString(), 
	}
}

function routeToAssignment(history, location, index, cells) {
	history.push({pathname: location.pathname+'/assignments/' + index, state: {moduleId: location.state.moduleId, assignmentId: index, moduleName: location.state.moduleName, assignmentName: cells[0].value}});
}

export default ModuleDetails;
