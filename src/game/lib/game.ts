import Phaser from 'phaser';

export class Game extends Phaser.Scene {
	game: Phaser.Game;
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
		image.anchor.set(0, 0);
	}

	destroy() {
		this.game.destroy();
		// TODO: find better way to remove element added by Phaser
		this.parent.removeChild(this.parent.querySelector('canvas'));
	}
}
