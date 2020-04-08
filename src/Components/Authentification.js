import React from 'react'
import {Link} from 'react-router-dom'
export const authHandler = {
	isAuthenticated: false,
	authenticate(role, username) {
		this.isAuthenticated = true
		console.log("We have authenticated!")
	},
	signout() {
		this.isAuthenticated = false
	}
}

export const LogoutButton = () => (
	<Link to="/login">
	<button type="button"
	onClick={() => authHandler.signout()}>
	Log out
	</button>
	</ Link>

)
