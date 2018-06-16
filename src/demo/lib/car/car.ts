import { ISteerable } from './driver';
import { inject } from 'lib/di';

export interface IAttachablePart {
	attach(parent: string): void;
}

export @inject(['car-wheel', 'car-engine']) class Car implements ISteerable {
	constructor(
		private wheel: IAttachablePart,
		private engine: IAttachablePart,
	) {
		wheel.attach('car');
		engine.attach('car');
	}

	steer(): void {
		console.log('car steers ok');
	}
}
