import { inject, injectable } from 'lib/di';

export interface ISteerable {
	steer(): void;
}

export @inject(['car']) class Driver {
	constructor(
		vehicle: ISteerable,
	) {
		vehicle.steer();
	}
}
