import React from 'react';
import axios from 'axios';
import InfoTable, {range, makeData} from './InfoTable';
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
	return makeData(newModule, 20);
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
						Header: 'Expected Marks',
						accessor: 'expectedMarks',
					},
					{
						Header: 'Marks Given',
						accessor: 'marksGiven',
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
	return {
		reviewer: "John O'Toole",
		author: "Anthony Burke",
		work: "assignment.pdf",
		expectedMarks: "75%",
		marksGiven: "68%",
		difference: "7%",
		reviewDate: "17/03/2020",
	}
}

export default InstructorModuleDetails;
