import { A } from './lib';
import config from './data/config';

const a = new A();

a.execute();

console.log(config.name);

console.log(process.env.SECRET_VALUE);
console.log(process.env.PRODUCTION);
console.log(process.env.PACKAGE.name);
console.log(process.env.PACKAGE.version);
console.log(process.env.PACKAGE.app);
console.log(process.env.APP);
