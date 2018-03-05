export class C {
	private name: string = 'C';

	public getName(): string {
		return this.name;
	}
	public tested(condition = true): void {
		if (condition) {
			console.log('Tested branch C.1');
		} else {
			console.log('Not tested branch C.2');
		}
	}

	public notTested(condition = false): void {
		if (condition) {
			console.log('Not tested method C.1');
		} else {
			console.log('Not tested method C.2');
		}
	}

	public * generator(): IterableIterator<number> {
		yield 1;
		yield 3;
		yield 7;
	}
}
