import { __ } from 'lib/localize';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

class App extends React.Component {
	public render() {
		return (<div>
			<h3>{ __('PHASER Game Test') }</h3>
		</div>);
	}
}

export default hot(module)(App);
