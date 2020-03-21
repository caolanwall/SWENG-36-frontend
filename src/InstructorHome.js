import React from 'react';
import axios from 'axios';
import InfoTable, {range, makeData} from './InfoTable';

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

	return <InfoTable columns={columns} data={data} />;
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

export default InstructorHome;
