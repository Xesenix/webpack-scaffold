import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { A, C } from './lib';
import config from '../data/config';
import App from './app';

import * as inversify from 'inversify';
import { Car } from './lib/car/car';
import { Driver } from './lib/car/driver';
import { Engine } from './lib/car/engine';
import { Wheel } from './lib/car/wheel';

const startTime = Date.now();

// Json
console.log(config.name);

// Javascript
const a = new A();
console.time('tested A');
a.tested(false);
console.timeEnd('tested A');

// Typescript
const c = new C();
console.time('tested C');
c.tested();
console.timeEnd('tested C');

// Compilation string replacement
const pckg = process.env.PACKAGE;

console.log(process.env.SECRET_VALUE);
console.log(process.env.PRODUCTION);
console.log(process.env.APP);
console.log('name', pckg.name);
console.log('version', pckg.version);
console.log('apps', pckg.apps);

const dic = new inversify.Container();
dic.bind('car').to(Car);
dic.bind('car-engine').to(Engine);
dic.bind('car-wheel').to(Wheel);
dic.bind('driver').to(Driver);

const driver = dic.get('driver');

// React
try {
	ReactDOM.render(
		<App onReady={ () => console.log('mounting time', Date.now() - startTime) }/>,
		document.getElementById('app')
	);
}
catch (err) {
	console.error(err);
}

window.onload = () => {
	console.log('onload time', Date.now() - startTime);
}
