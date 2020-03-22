import React from 'react';
import axios from 'axios';
import InfoTable, {range, makeData} from './InfoTable';
import {Link} from "react-router-dom";

const isLoggedIn = true;

class InstructorHome extends React.Component {

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
		    <div className="InstructorHome">
		    	<Link to="/login">
     				<button type="button" onClick={() => alert('Logging out!')}> Log out </button>
 				</Link>
		    	<header className="App-header">
		        	<p>
				Welcome Home, Instructor {this.state.username}
		        	</p>
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
						Header: 'Average',
						accessor: 'average',
					},
					{
						Header: 'Submission %',
						accessor: 'submissionPercentage',
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
	return {
		name: "DLD",
		title: "Full Adder", 
		stage: "Review",
		average: 7.5,
		submissionPercentage: 67,
		dateDue: "13/08/2020", 
	}
}

function routeToModule(history, location, index, cells) {
	//TODO route correctly depending on the assignment stage
	alert(index);
	history.push({pathname: location.pathname+'/modules/' + index, state: {moduleName: cells[0].value}});
}

export default InstructorHome;
