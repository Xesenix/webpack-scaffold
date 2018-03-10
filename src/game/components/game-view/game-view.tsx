import * as React from 'react';
import { hot } from 'react-hot-loader';

class GameView extends React.Component {
	parent?: HTMLDivElement;

	game: Phaser.Game;

	componentDidMount() {
		console.log('GameView:componentDidMount');

		if (module.hot) {
			module.hot.accept('lib/game', () => {
				console.log('GameView:hot', this.game, this.parent);
				this.game.destroy();
				const { Game } = require('lib/game');
				this.game = new Game(this.parent);
			});
		}

		const { Game } = require('lib/game');

		this.game = new Game(this.parent);
	}

	componentWillUnmount() {
		console.log('GameView:componentWillUnmount');
		if (this.game) {
			this.game.destroy();
		}
	}

	public render() {
		return (
			<div ref={(el: HTMLDivElement) => this.parent = el}/>
		);
	}
}

export default hot(module)(GameView);
