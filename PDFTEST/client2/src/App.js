import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import PDFView from './PDFView';
import Upload from './Upload';
import ReviewYourPeers from './PeerSubmission';

function App() {
  return (
    <Router>
		<div>
		<Switch>
		<Route path="/upload" component={Upload}/>
		<Route path="/pdfView" component={PDFView}/>
		<Route path="/peer" component={ReviewYourPeers}/>
		</Switch>
		</div>
		</Router>
  );
}

export default App;
//<Route path="/pdfView" component={PDFView}/>
