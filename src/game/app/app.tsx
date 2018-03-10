import { __ } from 'lib/localize';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import GameView from 'game/components/game-view/game-view';

class App extends React.Component {
	public render() {
		return (<div>
			<h3>{ __('PHASER Game Test') }</h3>
			<GameView/>
		</div>);
	}
}

export default hot(module)(App);
