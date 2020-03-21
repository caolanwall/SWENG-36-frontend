import React, {useMemo} from 'react';
import axios from 'axios';
import InfoTable, {range, makeData} from './InfoTable';

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

	return <InfoTable columns={columns} data={data} />;
}
const newModule = () => {
	return {
		name: "Computing I",
		title: "Matrix Multiplication", 
		stage: "Work",
		dateDue: "13/08/2020", 
	}
}

export default StudentHome;
