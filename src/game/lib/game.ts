import Phaser from 'phaser';

import { IDictionary } from 'lib/interfaces/dictionary';

type PropertyType = { current: number, max: number, reg?: number };

export class Game extends Phaser.Scene {
	game: Phaser.Game;
	private dictionary: IDictionary<PropertyType>;
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
		} as { [key: string]: PropertyType};

		this.label = this.add.text();
	}

	update = (delta) => {
		this.dictionary = Object.keys(this.dictionary).reduce((acc, key) => {
			const previous = this.dictionary[key];
			acc[key] = {
				// ...previous,
				current: Math.min(previous['current'] + previous['reg'] * delta, previous['max']),
			};
			return acc;
		}, {});

		this.label.text = '';

		Object.entries<PropertyType>(this.dictionary).forEach(([key, { current, max, reg = 0 }]) => {
			this.label.text += `${key}: ${current}/${max}\n`;
		});
	}

	destroy() {
		this.game.destroy();
		// TODO: find better way to remove element added by Phaser
		this.parent.removeChild(this.parent.querySelector('canvas'));
	}
}
