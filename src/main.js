import { A, C } from './lib';
import config from './data/config';
import start from './app';

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
console.log(pckg.name);
console.log(pckg.version);
console.log(pckg.app);

// React
window.onload = () => {
	try {
		start();
	}
	catch (err) {
		console.error(err);
	}
}
