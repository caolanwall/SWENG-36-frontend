import React from 'react';
import axios from 'axios';
import InfoTable, {range, makeData, getRandomDate} from './InfoTable';
import {Link} from "react-router-dom";

const isLoggedIn = true;

class InstructorModuleDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username : this.props.location.state.username, 	// passed on from the login screen 
			moduleName : this.props.location.state.moduleName
		};
	}

	componentDidMount() {
		let url = '127.0.0.1:8001/instructors/' + this.username + '/modules/' + this.moduleName;
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
			<DataTable />
			</div>
		);
	}

	jsonToModules(jsonResponse) { 
		return -1; //TODO parse json response from the server to instantiate students modules list
	}

}


function parseData(){
	//TODO actually parse JSON module data
	return makeData(newModule, 15);
}

function DataTable(){
	const columns = React.useMemo(
		() => [
			{
				Header: 'Module Details',
				columns: [
					{
						Header: 'Reviewer',
						accessor: 'reviewer',
					},
					{
						Header: 'Author',
						accessor: 'author',
					},
					{
						Header: 'Work',
						accessor: 'work',
					},
					{
						Header: 'Expected',
						accessor: 'expected',
					},
					{
						Header: 'Given',
						accessor: 'given',
					},
					{
						Header: 'Difference',
						accessor: 'difference',
					},
					{
						Header: 'Review Date',
						accessor: 'reviewDate',
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(() => parseData(), [])

	return <InfoTable columns={columns} data={data} />;
}
const newModule = () => {

	const firstNames = [

"Marge",  
"Michale",  
"Li",  
"Annita",  
"Gerardo",  
"Faye",  
"Arlene",  
"Muoi",  
"Maragaret",  
"Tiffani",  
"Sonny",  
"Florida",  
"Cris",  
"Beryl",  
"Adam",  
"Eliza",  
"Kathrin",  
"Daniela",  
"Ahmad",  
"Ute",  
"Clotilde",  
"Rena",  
"Svetlana",  
"Aleen",  
"Ashley",  
"Bev",  
"Franklin",  
"Kirstin",  
"Ian",  
"Myles",  
"Sheena",  
"Wilton",  
"Steven",  
"Barry",  
"Kim",  
"Annalee",  
"Drema",  
"Velma",  
"Merlyn",  
"Ethyl",  
"Delia",  
"Toi",  
"Korey",  
"Sandi",  
"Silvana",  
"Toya",  
"Douglass",  
"Kelsey",  
"Cesar",  
"Maple"
	];

	const lastNames = [

"Gambill",  
"Cusick",  
"Bruggeman",  
"Parkinson",  
"Linderman",  
"Filler",  
"Cothran",  
"Palen",  
"Roche",  
"Walworth",  
"Hagar",  
"Severin",  
"Pendergraft",  
"Dauphinais",  
"Angers",  
"Spece",  
"Middleton",  
"Pennington",  
"Cortinas",  
"Gehl",  
"Stout",  
"Carcamo",  
"Steveson",  
"Edgerly",  
"Knudson",  
"Reale",  
"Constance",  
"Madia",  
"Ables",  
"Sutcliffe",  
"Kellough",  
"Buckley",  
"Adorno",  
"Braggs",  
"Evenson",  
"Lurry",  
"Metzinger",  
"Schwantes",  
"Kaufmann",  
"Dehaven",  
"Grajeda",  
"Mater",  
"Edgley",  
"Lage",  
"Varela",  
"Aleshire",  
"Zynda",  
"Templeman",  
"Milligan",  
"Haslam"
	];

	const titles = ["Simple adding", "Matrix multiplication", "Full adder", "Graphs", "Threads", "Presentation", "Report", "Validation", "Memory", "Processor", "Input Output", "Interrupts", "Polling", "Sets", "Frogs", "Bit Fields", "Printing", "Graphics", "Calculator", "Queries", "Resistors", "Multiplexing"];

	const expected = Math.random() * 100;
	const given = Math.random() * 100;

	return {
		reviewer: firstNames[Math.floor(Math.random() * firstNames.length)] + " " +  lastNames[Math.floor(Math.random() * lastNames.length)],
		author: firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)],
		work: "assignment" + parseInt(Math.random() * 18) + ".pdf",
		expected: parseFloat(expected).toFixed(2) + '%',
		given: parseFloat(given).toFixed(2) + '%',
		difference: parseFloat(given - expected).toFixed(2) + '%',
		reviewDate: getRandomDate(new Date("2019-10-10"), new Date("2020-04-15")).toLocaleDateString(), 
	}
}

export default InstructorModuleDetails;
