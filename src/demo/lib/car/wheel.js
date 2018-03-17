import { injectable } from 'lib/di';

require('reflect-metadata');

@injectable()
export class Wheel {
	attach(parent) {
		console.log(`attached wheel to ${parent}`);
	}
}
