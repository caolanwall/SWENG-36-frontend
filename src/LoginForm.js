import React from 'react';

function LoginWrapper() {
	return (<div>
		<Title />
		<LoginForm />
		</div>
	);
}

function Title(props) {
	return <h1>reView</h1>;
}

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '', password: ''};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value});
	}
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleSubmit(event) {
		alert('Login submitted: ' + this.state.username + ' ' + this.state.password);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			<div>
			<div> Username: </div>
			<input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
			</div>
			<div>
			<div> Password: </div>
			<input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
			</div>
			<button> Reset </button> {" "}
			<input type="submit" value="Submit"/>
			</form>
		);
	}
}

export default LoginWrapper;
