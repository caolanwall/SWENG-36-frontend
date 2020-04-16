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
			submissions : [],
			usernames : new Map()
		};
	}

	componentDidMount() {
		//Get all submissions for this assignment
		const url = 'http://localhost:3001/submission?assignment_Id=' +
			this.state.assignmentId;

		axios.get(url,
			{headers : {'crossDomain' : true,
				'Content-type' : 'application/json'}})
			.then(res => {
				console.log("Result", res)
				if(res.data.data) {
					this.setState({submissions : res.data.data})
					//Get usernames for each assignment
					res.data.data.forEach(as => {
						if(!this.state.usernames.has(as.user_Id)){
							axios.get('http://localhost:3001/user?id=' +
								as.user_Id).then( result => {
									console.log("USER", result)
									if(result.data.data){
										console.log("Adding username")
										const names = this.state.usernames
										names.set(as.user_Id,
											result.data.data[0].name)
										this.setState({ usernames: names})
									}
								})
						}
					})
				}
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
			Submissions for assignment {this.state.assignmentName} from module {this.state.moduleName}
			</h2>
			</header>
			<DataTable submissions={this.state.submissions}
				usernames={this.state.usernames}
			/>
			</div>
		);
	}
}

const NavigationBar = () => (
	<LogoutButton />
)

const parseData = (props) => (
	props.submissions.map(sub => {
		console.log("Parsing sub", sub)

		const student = props.usernames.get(sub.user_Id)
		const submitted = sub.createdAt
		const reviews = sub.review_Comment.length
		const average = a => a.reduce((sume, el) => sume + el, 0) / a.length
		let averageScore = average(sub.review_Score)

		if(!averageScore) averageScore = 0

		const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }

		return {
			student: student,
			submitted: new Date(submitted).toLocaleTimeString('en-IE', options),
			reviews: reviews,
			averageScore: averageScore
		}
	})
)

function DataTable(props){
	const columns = React.useMemo(
		() => [
			{
				Header: 'Submissions',
				columns: [
					{
						Header: 'Student',
						accessor: 'student',
					},
					{
						Header: 'Submitted',
						accessor: 'submitted',
					},
					{
						Header: 'Reviews',
						accessor: 'reviews',
					},
					{
						Header: 'Average Score',
						accessor: 'averageScore',
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(() => parseData(props), [props, props.usernames])
	console.log("DATA:", parseData(props))

	return <InfoTable columns={columns} data={data} routeTo={routeToSubmission}/>;
}

function routeToSubmission(history, location, index, cells) {
	//TODO to submission details page
	history.push({pathname: location.pathname+'/modules/' + index, state: {moduleName: cells[0].value}});
}

export default AssignmentEditor;
