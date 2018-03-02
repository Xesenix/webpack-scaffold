export class A {
	name = 'A';

	getName() {
		return this.name;
	}

	execute(condition = true) {
		if (condition) {
			console.log('Execute A.1');
		} else {
			console.log('Execute A.2');
		}
	}

	notExecuted(condition = false) {
		if (condition) {
			console.log('Not execute A.1');
		} else {
			console.log('Not execute A.2');
		}
	}

	*generator() {
		yield 1;
		yield 3;
		yield 7;
	}
}
