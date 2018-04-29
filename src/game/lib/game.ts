import Phaser from 'phaser';

import { IDictionary } from 'lib/interfaces/dictionary';

export class Game extends Phaser.Scene {
	game: Phaser.Game;
	private dictionary: IDictionary<{ current: number, max: number, reg?: number }>;
	private label: Phaser.Text;

	constructor(private parent: HTMLElement) {
		super();

		this.game = new Phaser.Game({
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			scene: this,
			parent,
		});
	}

	preload = () => {
		console.log('Phaser:Scene:preload');
		this.load.image('game-banner', 'assets/images/banner.png');
	}

	create = () => {
		console.log('Phaser:Scene:create');
		const image = this.add.image(256, 256, 'game-banner');

		this.dictionary = {
			hp: { current: 12, max: 50 },
			mp: { current: 32, max: 40 },
		};

		this.label = this.add.text();
	}

	update = (delta) => {
		this.dictionary = this.dictionary.keys().reduce((acc, key) => {
			const previous = this.dictionary[key];
			acc[key] = {
				// ...previous,
				current: Math.min(previous['current'] + previous['reg'] * delta, previous['max']),
			};
			return acc;
		}, {});

		this.label.text = '';

		this.dictionary.forEach(({ current, max, reg = 0 }, key) => {
			this.label.text += `${key}: ${current}/${max}\n`;
		});
	}

	destroy() {
		this.game.destroy();
		// TODO: find better way to remove element added by Phaser
		this.parent.removeChild(this.parent.querySelector('canvas'));
	}
}
