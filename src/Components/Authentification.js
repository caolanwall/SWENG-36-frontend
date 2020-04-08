import React from "react";

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
