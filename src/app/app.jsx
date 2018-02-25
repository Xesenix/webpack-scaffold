import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import Timer from './component/timer';
import Theme from './component/theme';

class App extends React.Component {
	render() {
		return (<div className="box inverse">
			<h3>REACT is working</h3>
			<code>&lt;img src="assets/images/d.png"/&gt;</code>
			<img src="assets/images/d.png"/>
			<h3>Sub component</h3>
			<p>Styled via component stylesheet.</p>
			<Timer/>
			<Theme/>
		</div>);
	}
}

export default hot(module)(App);
