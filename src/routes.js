import {BrowserRouter, Swich, Route} from 'react-router-dom';

ReactDOM.render((
<BrowserRouter>
	<App /> //TODO change to actual root element's name
</BrowserRouter>
), document.getElementById('root'));

<Switch>
	<Route exact path='/' component={Home}/>
	<Route exact path='/login' component={LoginForm}/>
</Switch>