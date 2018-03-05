import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { A, C } from './lib';
import config from '../data/config';
import App from './app';

const startTime = Date.now();

// Json
console.log(config.name);

// Javascript
const a = new A();
a.tested();

// Typescript
const c = new C();
c.tested();

// Compilation string replacment
const pckg = process.env.PACKAGE;

console.log(process.env.SECRET_VALUE);
console.log(process.env.PRODUCTION);
console.log(process.env.APP);
console.log('name', pckg.name);
console.log('version', pckg.version);
console.log('apps', pckg.apps);

// React
window.onload = () => {
	try {
		console.log('onload time', Date.now() - startTime);
		ReactDOM.render(
			<App onReady={ () => console.log('mounting time', Date.now() - startTime) }/>,
			document.getElementById('app')
		);
	}
	catch (err) {
		console.error(err);
	}
}
