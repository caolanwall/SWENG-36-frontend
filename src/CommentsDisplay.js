import React, { Component } from 'react';
import { withRouter, Redirect, Link, Route } from "react-router-dom";

class CommentsDisplay extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            students: [
                { id: 1, age: 78, email: <li><Link to="/feedback/comments1">Comments</Link></li> },
                { id: 2, age: 60, email: <li><Link to="/feedback/comments2">Comments</Link></li> },
                { id: 3, age: 88, email: <li><Link to="/feedback/comments3">Comments</Link></li> },
            ]
        }
    }


    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <h1 id='title'>Review x of Assignment y</h1>
            </div>
        )
    }
}
export default CommentsDisplay