import { benchmark, groupLog } from './debug';


export class A {
	name = 'A';

	getName() {
		return this.name;
	}

	@groupLog('A')
	@benchmark()
	tested(condition = true) {
		if (condition) {
			console.log('Tested branch A.1');
		} else {
			console.log('Tested branch A.2');
		}
	}

	notTested(condition = false) {
		if (condition) {
			console.log('Not tested method A.1');
		} else {
			console.log('Not tested method A.2');
		}
	}

	*generator() {
		yield 1;
		yield 3;
		yield 7;
	}
}
