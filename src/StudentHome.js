import React from 'react';
import axios from 'axios';
import InfoTable from './InfoTable';

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
		        	<p>
		        	Welcome Home, Student {this.state.username}	
		        	</p>
		    	</header>
			<InfoTable />
		    </div>
	 	);
 	}

 	jsonToModules(jsonResponse) { 
 		return -1; //TODO parse json response from the server to instantiate students modules list
 	}

}


export default StudentHome;
