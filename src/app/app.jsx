import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import Timer from './component/timer';

class App extends React.Component {
	render() {
		return (<div className="box">
			<strong>REACT is working</strong><br/>
			<code>src="assets/images/d.png"</code><br/>
			<img src="assets/images/d.png"/><br/>
			<Timer></Timer>
		</div>);
	}
}

export default hot(module)(App);
