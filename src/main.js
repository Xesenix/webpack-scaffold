import { A, C } from './lib';
import config from './data/config';
import start from './app';

const a = new A();
a.execute();

const c = new C();
c.execute();

const pckg = process.env.PACKAGE;

console.log(config.name);

console.log(process.env.SECRET_VALUE);
console.log(process.env.PRODUCTION);
console.log(process.env.APP);
console.log(pckg.name);
console.log(pckg.version);
console.log(pckg.app);

start();
