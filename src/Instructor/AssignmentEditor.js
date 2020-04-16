import React from 'react';
import axios from 'axios';
import InfoTable, {makeData, getRandomDate} from './../Components/InfoTable';
import {Link} from "react-router-dom";
import {LogoutButton} from '../Components/Authentification'

class AssignmentEditor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username,
			userId: this.props.location.state.userId,
			moduleName: this.props.location.state.moduleName,
			assignmentId: this.props.location.state.assignmentId,
			assignmentName: this.props.location.state.assignmentName,
			submissions : []
		};
	}

	componentDidMount() {
		//Get all submissions for this assignment
		const url = 'http://localhost:3001/submission?user_Id='
			+ this.state.userId +
			'&assignment_Id=' +
			this.state.assignmentId;

		axios.get(url,
			{headers : {'crossDomain' : true,
				'Content-type' : 'application/json'}})
			.then(res => {
				console.log("Result", res)
				this.setState({submissions : res.data})
			})
			.catch(err => console.log(err)
			);
	}

	render() {
		return (
			<div className="AssignmentEditor" align="center">
			<NavigationBar />
			<header className="App-header">
			<h2>
			Edit assignment {this.state.assignmentName} from module {this.state.moduleName}
			</h2>
			</header>
			<DataTable />
			</div>
		);
	}
}

const NavigationBar = () => (
	<LogoutButton />
)

function parseData(){
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
