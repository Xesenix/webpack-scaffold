import { ISteerable } from './driver';
import { inject } from 'lib/di';

export interface IAttachablePart {
	attach(parent: string): void;
}

@inject(['car-wheel', 'car-engine'])
export class Car implements ISteerable {
	constructor(
		private wheel: IAttachablePart,
		private engine: IAttachablePart,
	) {
		this.wheel = wheel;
		this.engine = engine;
		this.wheel.attach('car');
		this.engine.attach('car');
	}

	steer(): void {
		console.log('car steers ok');
	}
}
