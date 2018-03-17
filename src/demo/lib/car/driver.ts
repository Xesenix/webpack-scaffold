import { inject, injectable } from 'lib/di';

export interface ISteerable {
	steer(): void;
}

@inject(['car'])
export class Driver {
	constructor(
		private vehicle: ISteerable,
	) {
		vehicle.steer();
	}
}
