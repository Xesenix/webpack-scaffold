import { injectable } from 'lib/di';

require('reflect-metadata');


export @injectable() class Wheel {
	attach(parent) {
		console.log(`attached wheel to ${parent}`);
	}
}
